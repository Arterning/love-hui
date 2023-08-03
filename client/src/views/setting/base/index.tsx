/**
 * 个人中心
 */
import React from 'react'
import './style.scss'
import Avatar from '@/components/avatar'
import userPoster from '@/assets/img/common/user-poster.png'
import { Card, Divider } from 'antd'
import { useAppSelector } from '@/hooks'

const { Meta } = Card

const additionInfo = [
    {
        birthdate: "1998年12月19日",
        size: "35码的鞋子",
        star:"水瓶座",
        name:"小慧",
        pid: 2,
    },
    {
        birthdate: "1995年11月14日",
        size: "42码的鞋子",
        star:"天秤座",
        name: "宁哥",
        pid: 1,
    }
]

const BasePage: React.FC = function () {
  const userInfo = useAppSelector(state => state.user.userInfo)
  const addInfo = additionInfo.find(info => info.pid == userInfo.uid)
  const MetaDesc = (
    <div className="meta-desc">
      <div>登录名：{userInfo.loginName}</div>
      <div>UID：{userInfo.uid}</div>
      <div>简介：{userInfo.bio}</div>
      <div>邮箱：{userInfo.email}</div>
      <div>地区：{userInfo.location}</div>
      <div>注册时间：{userInfo.createdAt}</div>
      <div>生日：{addInfo?.birthdate}</div>
      <div>鞋码：{addInfo?.size}</div>
      <div>星座：{addInfo?.star}</div>
    </div>
  )

  return (
    <div className="setting-base">
      <Divider orientation="left" plain>个人中心</Divider>
      <Card
        style={{ width: 370 }}
        cover={
          <img
            alt="可爱的头像"
            src={userInfo.avatarUrl}
            className="poster"
          />
        }
      >
        <Meta
          avatar={<Avatar src={userInfo.avatarUrl} size="large" />}
          title={userInfo.username}
          description={MetaDesc}
        />
      </Card>
    </div>
  )
}

export default BasePage
