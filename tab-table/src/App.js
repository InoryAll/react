import React from 'react';
import ListTable  from './ListTable';
import 'antd/dist/antd.css';

export default class App extends React.Component {
    onSearch = (p) => {
        console.log('onSearch',p);
    };

    render() {
        const initSearchParams = {kind:""};

        // 需要展示的列
        const columns = [{
            key: 'workType',
            dataIndex: 'workType',
            title: '工作类型'
           /* render: (text, record) => {
                return <a href={`/product/base/detail/${record.prodId}`} >{record.prodId}</a>;
            },*/
        }, {
            key: 'workContent',
            dataIndex: 'workContent',
            title: '工作内容'
        }, {
            key: 'nextFollowUpTime',
            dataIndex: 'nextFollowUpTime',
            title: '下次跟进时间',
            sorter: true,
        }, {
            key: 'nextFollowUpContent',
            dataIndex: 'nextFollowUpContent',
            title: '下次跟进内容'
        }, {
            key: 'contactPerson',
            dataIndex: 'contactPerson',
            title: '联系人'
        }, {
            key: 'contactTime',
            dataIndex: 'contactTime',
            title: '联系时间',
            sorter: true
        }, {
            key: 'addedPerson',
            dataIndex: 'addedPerson',
            title: '添加人',
        }, {
            key: 'attachment',
            dataIndex: 'attachment',
            title: '附件',
            render: (text, record) => {
                 return <a href="#" >查看</a>;
             }
        }];

        const worksheet = {
            currentPage: 1,
            empty: false,
            loading: false,
            totalCount: 32,
            totalPage: 4,
            dataList: [{
                key: '33144576-5173-08ac-6ef3-1ad0f1295d15',
                workType: '销售机会跟进',
                workContent: '弘康未完成外呼，线下告知添加客户微信',
                nextFollowUpTime: '',
                nextFollowUpContent: '',
                contactPerson: '客户',
                contactTime: '2017-5-11',
                addedPerson:'huaxia'
            }],
        };
        // tabs ,tabCount
        //tabs格式：{field:"xxx","showTotal":true,defaultShow:"", tags:[{"fieldValue":"","displayValue":"全部"},{"fieldValue":"男","displayValue":"男","showTotal":true},{"fieldValue":"女","displayValue":"女"}]}
        const tabCount = {0: 10, 1: 11, 2: 10,3: 10};
        const tabs = {
            field:"kind",
            showTotal:true,
            defaultShow:"",
            tags:[
                {fieldValue: "",displayValue:"工作记录" },
                {fieldValue: "1",displayValue:"新一站工作记录" },
                {fieldValue: "2",displayValue:"销售机会"},
                {fieldValue: "3",displayValue:"购买订单"}
            ]
        };
        return (
            <ListTable
                initSearchParams={initSearchParams}
                columns={columns}
                data={worksheet}
                onSearch={this.onSearch}
                rowClassName={(record)=>'test'}
                tabs={tabs}
                tabCount={tabCount}
            />);
    }
}
