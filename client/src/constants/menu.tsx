import {
  HomeOutlined,
  BarChartOutlined,
  FormOutlined,
  UserOutlined,
  InsertRowLeftOutlined, AppleFilled, GithubFilled, TwitterCircleFilled, RocketFilled,
} from '@ant-design/icons'
import {HeartIcon, PandaIcon} from "@/components/icon"

export const HOME_SIDER_MENU_LIST = [
  {
    name: '后台首页',
    icon: <HomeOutlined />,
    path: '/home/index',
  },
  {
    path: '/home/reminder',
    icon: <PandaIcon />,
    name: '提醒事项'
  },
  {
    path: '/home/todoList',
    icon: <HeartIcon style={{color: 'hotpink'}}/>,
    name: '心愿清单',
  },
  {
    path: '/home/todayTask',
    icon: <AppleFilled style={{color: 'gray'}}/>,
    name: '今日待办'
  },
  {
    path: '/home/rank',
    icon: <GithubFilled />,
    name: '积分排名'
  },
  {
    path: '',
    icon: <TwitterCircleFilled style={{color: 'brown'}}/>,
    name: '财务管理',
    children: [
      {
        path: '/home/capitalFlow',
        name: '资金流动',
      },
      {
        path: '/home/capitalFlow/type',
        name: '创建类别',
      }
    ]
  },
  {
    path: '',
    icon: <FormOutlined />,
    name: '笔记管理',
    children: [
      {
        path: '/home/memorandum',
        name: '笔记列表',
      },
      {
        path: '/home/memorandum/create',
        name: '创建笔记',
      }
    ]
  },
  // {
  //   path: '/home/log',
  //   icon: <SnippetsOutlined />,
  //   name: '日志管理'
  // },
  {
    path: '/home/company',
    icon: <RocketFilled style={{color: 'greenyellow'}}/>,
    name: '公司单位'
  },
  {
    path: '/home/setting/base',
    icon: <UserOutlined />,
    name: '个人中心'
  }
]

export const SETTING_SIDER_MENU_LIST = [
  {
    path: '/home/setting/base',
    name: '个人中心'
  },
  // {
  //   path: '/home/setting/innerMessage',
  //   name: '消息中心'
  // },
  // {
  //   path: '/home/setting/notification',
  //   name: '消息通知'
  // },
  {
    path: '/home/setting/account',
    name: '账号设置'
  },
]
