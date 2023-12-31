import React, {useState, useEffect} from 'react'
import {Button, Table, Tag} from "antd"
import useKeepState from "use-keep-state"
import {serviceGetRank} from "@/services/rank"
import RankChart from "@/views/rank/RankChart"

const initialState = {
    showCreateTypeModal: false,
    selectedRowKeys: [],
    loading: false,
    data: [],
    rowData: null
}

interface RankData {
    name :string
    partnerId: number
    rank: number
    color: string
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
            render: (rowData: any) => (
                <Tag color={rowData.color}>{rowData.rank}</Tag>
            )
        },
    ]

    const rowSelection = {
        selectedRowKeys: state.selectedRowKeys,
        onChange: (selectedRowKeys: any) => {
            setState({selectedRowKeys})
        }
    }

    function getRankData() {
        setState({loading: true})
        serviceGetRank().then(resp => {
            const data = resp.data
            // Sort the array by score in descending order
            data.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score)
            // Add a "rank" property to each object based on the sorted order
            data.forEach((item: RankData, index: number) => {
                item.rank = index + 1
                item.name = item.partnerId == 1 ? '宁哥' : '小慧'
                item.color = item.partnerId == 1 ? 'orange' : 'pink'
            })
            setState({data})
        }).finally(() => {
            setState({loading: false})
        })
    }

    useEffect(() => {
        getRankData()
    }, [])

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
            <RankChart/>
        </div>
    )
}


export default RankPage
