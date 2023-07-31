/**
 * 账号设置
 */
import React, {useEffect} from 'react'
import md5 from 'blueimp-md5'
import {serviceUpdateUser, serviceGetUserConfig, serviceUpdateUserConfig} from '@/services'
import {Form, Input, Button, Divider} from 'antd'
import {useAppSelector} from '@/hooks'

const AccountPage: React.FC = function () {
    const [form] = Form.useForm()
    const userInfo = useAppSelector(state => state.user.userInfo)

    async function handleUpdateUser() {
        try {
            const values = await form.validateFields()
            console.log(values)
            serviceUpdateUser({
                password: md5(values.password),
                location: values.location,
                bio: values.bio,
                email: values.email
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        form.setFieldsValue({
            location: userInfo.location,
            email: userInfo.email,
            bio: userInfo.bio
        })
    }, [])


    return (
        <div className="account-setting">
            <Divider orientation="left" plain>修改密码</Divider>
            <Form layout="vertical" form={form} style={{width: 300}}>
                <Form.Item
                    label="登录名"
                    name="name"
                    initialValue={userInfo.loginName}
                    rules={[
                        {required: true}
                    ]}
                >
                    <Input readOnly disabled/>
                </Form.Item>

                <Form.Item
                    label="新密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "请输入新密码"
                        },
                        {
                            pattern: /.{4,}/,
                            message: "新密码至少4位"
                        }
                    ]}
                >
                    <Input type="password" maxLength={32}/>
                </Form.Item>

                <Form.Item label="地点" name="location">
                    <Input maxLength={255}/>
                </Form.Item>

                <Form.Item label="邮箱地址" name="email">
                    <Input maxLength={32}/>
                </Form.Item>

                <Form.Item label="简介" name="bio">
                    <Input maxLength={255}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleUpdateUser}>提交</Button>
                </Form.Item>
            </Form>

            <Divider orientation="left" plain>这是一个华丽的分割线</Divider>

        </div>
    )
}

export default AccountPage
