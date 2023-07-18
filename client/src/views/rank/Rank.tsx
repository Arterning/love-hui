import React, {useState, useEffect} from 'react'
import {Button, Table, Tag} from "antd"
import useKeepState from "use-keep-state";

const initialState = {
    showCreateTypeModal: false,
    selectedRowKeys: [],
    loading: false,
    data: [
        {
            "name": "黄宁",
            "rank": "1",
            "color": "orange",
            "score": "123"
        },
        {
            "name": "小慧",
            "rank": "2",
            "color": "blue",
            "score": "68"
        }],
    rowData: null
}

const RankPage: React.FC = () => {

    const [state, setState] = useKeepState(initialState)
    const tableColumns = [
        {
            title: '用户名称',
            dataIndex: 'name'
        },
        {
            title: '积分',
            render: (rowData: any) => (
                <Tag color={rowData.color}>{rowData.score}</Tag>
            )
        },
        {
            title: '排名',
            dataIndex: 'rank'
        },
    ]

    const rowSelection = {
        selectedRowKeys: state.selectedRowKeys,
        onChange: (selectedRowKeys: any) => {
            setState({selectedRowKeys})
        }
    }
    return (
        <div>
            <Table
                rowSelection={rowSelection}
                columns={tableColumns}
                dataSource={state.data}
                pagination={false}
                rowKey="id"
                loading={state.loading}
            />
        </div>
    )
}


export default RankPage
