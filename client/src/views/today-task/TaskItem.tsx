import React, {MouseEventHandler} from 'react'
import './style.scss'
import { serviceDeleteTask, serviceUpdateTask } from '@/services'
import {
  Card,
  Button,
  Rate,
  Popconfirm
} from 'antd'
import { formatDateTime } from '@/utils'
import {PARTNER} from "@/views/today-task/enum";

interface Props {
  data: Record<string, any>,
  reloadData(): void,
  onClick: React.MouseEventHandler
}

const TaskItem: React.FC<Props> = ({ data, reloadData, onClick }) => {

  // 0=删除, 1=开始/完成, 2=回退
  function handleAction(buttonType: number) {
    if (buttonType === 0) {
      serviceDeleteTask(data.id)
      .then(() => {
        reloadData()
      })
    } else {
      serviceUpdateTask(data.id, {
        rollback: buttonType === 2 && true
      })
      .then(() => {
        reloadData()
      })
    }
  }

  function formatPartner(partner: number): string | undefined {
    const found = PARTNER.find(item => item.value === partner)
    return found?.name
  }

  return (
    <Card
      title="我的待办"
      hoverable
      className="task-component"
    >
      <div onClick={onClick}>
        <p className="content">{data.content}</p>
        <div className="level">
          <span>优先级别：</span>
          <Rate value={data.count} disabled></Rate>
          <p className="mt10">
            创建时间: {formatDateTime(data.createdAt)}
          </p>
          <span>任务分配：{formatPartner(data.partner)}</span>
        </div>
      </div>
      <div className="button-wrapper">
        <Popconfirm
          title="您确定要删除吗？"
          onConfirm={handleAction.bind(null, 0)}
          placement="bottomLeft"
          okType="danger"
        >
          <Button
            type="primary"
            danger
            size="small"
          >
            删除
          </Button>
        </Popconfirm>
        <Button type="primary" size="small" onClick={onClick}>
          编辑
        </Button>

        {(data.type === 1) && (
          <Button
            type="primary"
            size="small"
            onClick={handleAction.bind(null, 1)}
          >
            开始
          </Button>
        )}
        {([2, 3].includes(data.type)) && (
          <Button
            type="primary"
            size="small"
            onClick={handleAction.bind(null, 2)}
          >
            回退
          </Button>
        )}
        {(data.type === 2) && (
          <Button
            type="primary"
            size="small"
            onClick={handleAction.bind(null, 1)}
          >
            完成
          </Button>
        )}
      </div>
    </Card>
  )
}

export default React.memo(TaskItem)
