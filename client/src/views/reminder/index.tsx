/**
 * 提醒事项
 */
import React, { useEffect, useRef } from 'react'
import Table from '@/components/table'
import dayjs from 'dayjs'
import CreateReminder from './CreateReminder'
import useKeepState from 'use-keep-state'
import { connect } from 'react-redux'
import { DatePicker, Button, Select, Tag, Modal, Form, Popconfirm } from 'antd'
import { serviceGetReminder, serviceDeleteReminder } from '@/services'
import { FORMAT_DATE, formatDateTime } from '@/utils'

const { RangePicker } = DatePicker
const Option = Select.Option
const STATUS_TYPE: Record<string, any> = {
  1: { color: '#f50', text: '待提醒' },
  2: { color: '#87d068', text: '已提醒' }
}

interface State {
  showCreateModal: boolean
  currentRow: Record<string, any> | null
}

type Props = ReturnType<typeof mapStateToProps>

const initialState: State = {
  showCreateModal: false,
  currentRow: null
}

const ReminderPage: React.FC<Props> = function({ userInfo }) {
  const [form] = Form.useForm()
  const [state, setState] = useKeepState(initialState)
  const tableRef = useRef<any>()
  const tableColumns = [
    {
      title: '状态',
      dataIndex: 'type',
      width: 100,
      render: (row: any) => (
        <Tag color={STATUS_TYPE[row].color}>
          {STATUS_TYPE[row].text}
        </Tag>
      )
    },
    {
      title: '提醒时间',
      dataIndex: 'createdAt',
      width: 220
    },
    {
      title: '提醒内容',
      dataIndex: 'content',
      className: 'wbba wpr'
    },
    {
      title: '操作',
      width: 180,
      align: 'right',
      fixed: 'right',
      render: (record: any) => (
        <>
          <Button onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm
            title="您确定要删除吗？"
            onConfirm={() => handleDelete(record)}
            placement="bottomLeft"
            okType="danger"
          >
            <Button>删除</Button>
          </Popconfirm>
        </>
      )
    }
  ]

  const initParams = function() {
    const startDate = dayjs().startOf('year')
    const endDate = dayjs().endOf('year')
    form.setFieldsValue({
      queryType: '',
      date: [startDate, endDate]
    })
    tableRef?.current?.getTableData()
  }

  function getReminder(params: any = {}) {
    const values = form.getFieldsValue()

    if (values.date && values.date.length === 2) {
      params.startDate = values.date[0].format(FORMAT_DATE)
      params.endDate = values.date[1].format(FORMAT_DATE)
    }

    if (values.queryType !== '') {
      params.type = values.queryType
    }

    return serviceGetReminder(params).then(res => {
      res.rows = res.rows.map((el: any, idx: number) => {
        el.order = idx + 1
        el.createdAt = formatDateTime(el.createdAt)
        return el
      })
      return res
    })
  }

  function handleEdit(record: any) {
    setState({
      showCreateModal: true,
      currentRow: record
    })
  }

  function handleDelete(record: any) {
    serviceDeleteReminder(record.id)
      .then(() => {
        tableRef.current.getTableData()
      })
  }

  // modal成功新增回调函数
  function handleCloseModal() {
    setState({ showCreateModal: false })
    tableRef.current.getTableData()
  }

  useEffect(() => {
    initParams()
  }, [])

  return (
    <div className="reminder">
      <div className="query-panel">
        <Form
          form={form}
          layout="inline"
          onValuesChange={() => tableRef?.current?.getTableData()}
        >
          <Form.Item
            name="queryType"
            label="查询类型"
            initialValue=""
          >
            <Select>
              <Option value="">全部</Option>
              <Option value="1">待提醒</Option>
              <Option value="2">已提醒</Option>
            </Select>
          </Form.Item>

          <Form.Item name="date" label="日期">
            <RangePicker allowClear />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={() => tableRef.current.getTableData()}>查询</Button>
            <Button onClick={initParams}>重置</Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        ref={tableRef}
        getTableData={getReminder}
        columns={tableColumns}
        onDelete={serviceDeleteReminder}
        onAdd={() => setState({ showCreateModal: true, currentRow: null })}
      />

      <CreateReminder
        visible={state.showCreateModal}
        rowData={state.currentRow}
        onCancel={handleCloseModal}
        onSuccess={handleCloseModal}
      />
    </div>
  )
}

const mapStateToProps = (store: any) => ({
  userInfo: store.user.userInfo
})

export default connect(mapStateToProps)(ReminderPage)
