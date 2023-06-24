import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/global.scss'
import AppRoute from './router'
import 'antd/dist/reset.css'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import store from '@/store'

dayjs.locale('zh-cn')

const root = ReactDOM.createRoot(document.getElementById("arterning-manage-root") as HTMLElement)

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <AppRoute />
      </ConfigProvider>
    </Provider>
  // </React.StrictMode>
)
