import React, { useEffect } from 'react'
import './style.scss'
import useKeepState from 'use-keep-state'
import NoData from '@/components/no-data/index'
import TaskItem from './TaskItem'
import CreateTaskModal from './CreateTaskModal'
import dayjs from 'dayjs'
import { DatePicker, Button, Tag, Row, Col, Form } from 'antd'
import { serviceGetTask } from '@/services'
import { FORMAT_DATE } from '@/utils'

interface TaskProp {
  text: string
  color: string
}

const TASK_TYPE: {
  [key: string]: TaskProp
} = {
  wait: { text: '待作业', color: 'orange' },
  process: { text: '作业中', color: '#108ee9' },
  finished: { text: '已完成', color: '#87d068' },
  unfinished: { text: '未完成', color: '#f50' }
}

interface State {
  data: {
    wait: TaskProp[]
    process: TaskProp[]
    finished: TaskProp[]
    unfinished: TaskProp[]
  }
  showCreateTaskModal: boolean
}

const initialState: State = {
  data: {
    wait: [],
    process: [],
    finished: [],
    unfinished: []
  },
  showCreateTaskModal: false
}

const TodayTaskPage = () => {
  const [form] = Form.useForm()
  const [state, setState] = useKeepState(initialState)

  function getTask() {
    const values = form.getFieldsValue()
    const date = values.startDate.format(FORMAT_DATE)
    serviceGetTask({
      startDate: date,
      endDate: date
    })
    .then(res => {
      setState({ data: res })
    })
  }

  function initParams() {
    form.setFieldsValue({
      startDate: dayjs()
    })
    getTask()
  }

  function toggleCreateTaskModal() {
    setState({ showCreateTaskModal: !state.showCreateTaskModal })
  }

  function handleSuccess() {
    toggleCreateTaskModal()
    getTask()
  }

  function handlePrevDay() {
    const startDate: dayjs.Dayjs = form.getFieldValue('startDate')
    form.setFieldsValue({
      startDate: dayjs(
        startDate.subtract(1, 'day').format(FORMAT_DATE)
      )
    })
    getTask()
  }

  function handleNextDay() {
    const startDate: dayjs.Dayjs = form.getFieldValue('startDate')
    form.setFieldsValue({
      startDate: dayjs(
        startDate.add(1, 'day').format(FORMAT_DATE)
      )
    })
    getTask()
  }

  useEffect(() => {
    initParams()
  }, [])

  return (
    <div className="today-task">
      <div className="query-panel">
        <Form
          form={form}
          layout="inline"
          onValuesChange={getTask}
        >
          <Form.Item name="startDate" label="查询日期">
            <DatePicker allowClear={false} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={getTask}>查询</Button>
            <Button onClick={handlePrevDay}>前一天</Button>
            <Button onClick={handleNextDay}>后一天</Button>
            <Button onClick={toggleCreateTaskModal}>新增</Button>
            <Button onClick={initParams}>重置</Button>
          </Form.Item>
        </Form>
      </div>

      <div className="wrapper">
        {(
          state.data.wait.length > 0 ||
          state.data.process.length > 0 ||
          state.data.finished.length > 0 ||
          state.data.unfinished.length > 0
        ) ? (
          <Row gutter={24}>
            {Object.keys(state.data).map((key: string) => (
              <Col span={6} key={key}>
                <div className="tac">
                  <Tag color={TASK_TYPE[key].color}>{TASK_TYPE[key].text}</Tag>
                </div>
                {state.data[key].map((item: any) => (
                  <TaskItem key={item.id} data={item} reloadData={getTask} />
                ))}
              </Col>
            ))}
          </Row>
        ) : (
          <NoData
            message="还没有待办事项，是否马上创建？"
            onClick={toggleCreateTaskModal}
          />
        )}
      </div>

      <CreateTaskModal
        visible={state.showCreateTaskModal}
        onSuccess={handleSuccess}
        onCancel={toggleCreateTaskModal}
      />
    </div>
  )
}

export default TodayTaskPage
