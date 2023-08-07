import React, {useEffect} from 'react'
import useKeepState from 'use-keep-state'
import {isBefore, formatDateTime, filterOption} from '@/utils'
import {serviceCreateTask, serviceUpdateTask} from '@/services'
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Rate, Select
} from 'antd'
import dayjs from "dayjs"
import {PARTNER} from "@/views/today-task/enum"
const { Option } = Select

type Props = {
  visible: boolean
  data?: Record<string, any>
  onSuccess(): void
  onCancel(): void
}

const { TextArea } = Input
const initialState = {
  confirmLoading: false,
}

const CreateTaskModal: React.FC<Props> = function ({
  visible,
  onSuccess,
  onCancel,
  data
}) {
  const [form] = Form.useForm()
  const [state, setState] = useKeepState(initialState)

  async function handleSubmitForm() {
    try {
      const values = await form.validateFields()
      const params = {
        date: formatDateTime(values.date),
        content: values.content.trim(),
        count: values.count,
        partner: values.partner
      }

      setState({ confirmLoading: true });

      (
          !data
              ? serviceCreateTask(params)
              : serviceUpdateTask(data.id, params)
      )
        .then(() => {
          onSuccess()
        })
        .finally(() => {
          setState({ confirmLoading: false })
        })

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: dayjs(data.createdAt),
        content: data.content,
        count: data.count,
        partner: data.partner
      })
    }
  })

  return (
    <Modal
      title="新增"
      open={visible}
      onOk={handleSubmitForm}
      onCancel={onCancel}
      confirmLoading={state.confirmLoading}
      destroyOnClose
    >
      <Form form={form} preserve={false}>
        <Form.Item
          label="开始日期"
          name="date"
          rules={[
            {
              required: true,
              message: "请选择日期"
            }
          ]}
        >
          <DatePicker
            allowClear={false}
            className="w100"
          />
        </Form.Item>

        <Form.Item
          label="任务内容"
          name="content"
          rules={[
            {
              required: true,
              message: "请输入内容"
            }
          ]}
        >
          <TextArea
            rows={3}
            maxLength={200}
            placeholder="请输入内容"
          />
        </Form.Item>

        <Form.Item label="任务分配"
                   name="partner"
                   rules={[
                     {
                       required: true,
                       message: "请选择任务人"
                     }
                   ]}>
          <Select
              showSearch
              className="w150px"
              filterOption={filterOption}
          >
            {PARTNER.map(item => (
                <Option value={item.value} key={item.value}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="优先级别"
          name="count"
          initialValue={5}
          rules={[
            {
              required: true,
              message: "请选择优先级"
            }
          ]}
        >
          <Rate />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.memo(CreateTaskModal)
