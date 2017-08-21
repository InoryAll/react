import React from 'react';
import { ListTable } from '@xyz/antdx';
import 'antd/dist/antd.css';

export default class App extends React.Component {
    state = {
        dataSource: [],
    };
    onSearch = (p) => {
        console.log('onSearch',p);
    };
    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                {id:Math.random(), value},
                {id:Math.random(), value:value + value},
                {id:Math.random(), value:value + value+ value}
            ],
        });
    }

    render() {
        const initSearchParams = {};
        // 搜索栏数据
        const searchTerms = [{
            param: 'prodIdEq',
            label: '产品ID',
            type: 'text',
        }, {
            param: 'prodNameLike',
            label: '产品名称',
            type: 'text',
        }, {
            param: 'templateIdEq',
            label: '保险模板',
            type: 'select',
            initData: [{
                key: '0',
                value: '待完善',
                default: true,
            }, {
                key: '1',
                value: '新建',
            }],
        }, {
            param: 'insComIdEq',
            label: '品牌公司',
            type: 'cascaderSelect',
            initData: {
                firstSelect: {
                    label: '品牌',
                    initData: {data: [{
                        key: '0',
                        value: '全部',
                    },{
                        key: '1',
                        value: '待完善',
                        default: true,
                    }, {
                        key: '2',
                        value: '新建',
                    }]},
                    onChange: () => {},
                },
                secondSelect: {
                    label: '公司',
                    initData: {data: [{
                        key: '0',
                        value: '待完善',
                    }, {
                        key: '1',
                        value: '新建',
                    }]},
                    onChange: () => {},
                },
            },
        }, {
            param: 'prodStatusEq',
            label: '产品状态',
            type: 'select',
            initData: [{
                key: '0',
                value: '待完善',
            }, {
                key: '1',
                value: '新建',
            }, {
                key: '2',
                value: '确认',
            }, {
                key: '3',
                value: '下架',
            }],
        }, {
            param: 'trialTypeEq',
            label: '测算类型',
            type: 'select',
            initData: [{
                key: '0',
                value: '未设置',
            }, {
                key: '1',
                value: '固定价格',
            }, {
                key: '2',
                value: '试算脚本',
            }],
        }, {
            param: 'addTime',
            label: '添加时间',
            type: 'dateAndTimePicker',
        }, {
            param: 'addUser',
            label: '添加人',
            type: 'searchInput',
            dataSource: this.state.dataSource,
            handleSearch: this.handleSearch
        }];

        // 需要展示的列
        const columns = [{
            key: 'prodId',
            dataIndex: 'prodId',
            title: '基础产品ID',
            sorter: true,
            render: (text, record) => {
                return <a href={`/product/base/detail/${record.prodId}`} >{record.prodId}</a>;
            },
        }, {
            key: 'prodName',
            dataIndex: 'prodName',
            title: '基础产品名称',
            sorter: true,
        }, {
            key: 'prodStatus',
            dataIndex: 'prodStatus',
            title: '基础产品状态',
            render: (text, record) => {
                switch (record.prodStatus) {
                    case 0 :
                        return '待完善';
                    case 1:
                        return '新建';
                    case 2:
                        return '待入库';
                    case 3:
                        return '已入库';
                    case 4:
                        return '已停售';
                    default:
                        return '暂无该基础产品状态';
                }
            },
            sorter: true,
        }, {
            key: 'insComName',
            dataIndex: 'insComName',
            title: '公司名称',
            sorter: true,
        }, {
            key: 'templateName',
            dataIndex: 'templateName',
            title: '产品模板',
            sorter: true,
        }, {
            key: 'trialType',
            dataIndex: 'trialType',
            title: '试算类型',
            render: (text, record) => {
                switch (record.trialType) {
                    case 0 :
                        return '未设置价格';
                    case 1:
                        return '固定价格';
                    case 2:
                        return '失算脚本';
                    default:
                        return '暂无该试算类型';
                }
            },
            sorter: true,
        }, {
            key: 'operation',
            width: 200,
            dataIndex: 'operation',
            title: '操作',
            render: (text, record) => {
                // 产品状态为待完善和新建才可编辑
                if (record.prodStatus === 0 || record.prodStatus) {
                    const editOne = `/product/edit/one/${record.prodId}`;
                    const editTwo = `/product/edit/two/${record.prodId}`;
                    const editThree = `/product/edit/three/${record.prodId}`;
                    const editFour = `/product/edit/four/${record.prodId}`;
                    return (
                        <div>
                            <a to={editOne}>编辑基本信息</a>
                            <a to={editTwo}>编辑动态属性</a>
                            <a to={editThree}>试算产品价格</a>
                            <a to={editFour}>设置联动规则</a>
                        </div>
                    );
                }
                return <div>&nbsp;</div>;
            },
        }];

        const baseProdList = {
            currentPage: 1,
            empty: false,
            loading: false,
            totalCount: 32,
            totalPage: 4,
            dataList: [{
                insComId: 4,
                insComName: '美亚财产保险有限公司上海分公司',
                key: '33144576-5173-08ac-6ef3-1ad0f1295d15',
                prodId: 3000095,
                prodName: '美亚“畅游神州”境内旅行保障成人版计划1（经济款）',
                prodStatus: 1,
                templateId: 1,
                templateName: '旅游险',
                trialType: 2,
            }, {
                insComId: 1,
                insComName: '中国平安财产保险股份有限公司江苏分公司',
                key: '33144576-5173-08ac-6ef3-1ad0f1295d16',
                prodId: 3000094,
                prodName: '测试',
                prodStatus: 1,
                templateId: 1,
                templateName: '旅游险',
                trialType: 2,
            }, {
                insComId: 1,
                insComName: '紫金财产保险股份有限公司',
                key: '33144576-5173-08ac-6ef3-1ad0f1295d17',
                prodId: 3000094,
                prodName: '短期出游自和共和国和合格后',
                prodStatus: 1,
                templateId: 1,
                templateName: '健康险',
                trialType: 2,
            }],
        };
        // tabs ,tabCount
        //tabs格式：{field:"xxx","showTotal":true,defaultShow:"", tags:[{"fieldValue":"","displayValue":"全部"},{"fieldValue":"男","displayValue":"男","showTotal":true},{"fieldValue":"女","displayValue":"女"}]}
        const tabCount = {0: 2, 1: 1, 2: 54};
        const tabs = {
            field:"sex",
            showTotal:true,
            defaultShow:"",
            tags:[
                {fieldValue: "",displayValue:"全部" },
                {fieldValue: "1",displayValue:"男" },
                {fieldValue: "2",displayValue:"女"}
            ]
        };
        return (
            <ListTable
                initSearchParams={initSearchParams}
                columns={columns}
                data={baseProdList}
                searchTerms={searchTerms}
                onSearch={this.onSearch}
                rowClassName={(record)=>'test'}
                tabs={tabs}
                tabCount={tabCount}
            />);
    }
}
