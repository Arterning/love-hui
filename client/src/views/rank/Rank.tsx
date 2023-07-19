import React, {useState, useEffect} from 'react'
import {Button, Table, Tag} from "antd"
import useKeepState from "use-keep-state";
import {serviceGetRank} from "@/services/rank";
import {TypeColors, TypeNames} from "@/views/capital-flow/enum";
import dayjs from "dayjs";
import {FORMAT_DATE_MINUTE} from "@/utils";

const initialState = {
    showCreateTypeModal: false,
    selectedRowKeys: [],
    loading: false,
    data: [],
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

    function getRankData() {
        setState({loading: true})
        serviceGetRank().then(res => {
            setState({data: res})
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
        </div>
    )
}


export default RankPage
