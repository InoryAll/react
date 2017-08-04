import React from 'react';
import ReactDOM from 'react-dom';
import {TeacherCourseHeaderForm} from './TeacherCourseHeader';
import {Card,Icon,Modal,Table} from 'antd';
import {getCookie} from "../util";

export default class TeacherCourseSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
    }

    fetchData=() => {
        fetch('http://localhost:8080/studentmanagement/TeacherAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'action=searchCourse'+'&teaId='+getCookie('username')
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title:'错误',
                    content:'初始化失败,请重试!'
                });
            }
            else{
                this.setState({
                    data:data.courses
                });
            }
        }).catch((e) =>{
            console.log(e.message);
        });
    };

    refreshData=(data) => {
        this.setState({
            data:data
        });
    };

    componentDidMount(){
        this.fetchData();
    }

    render(){
        const columns = [{
            title: '课程号',
            dataIndex: 'courseId',
            key: 'courseId'
        }, {
            title: '课程名',
            dataIndex: 'courseName',
            key: 'courseName'
        }, {
            title: '课程性质',
            dataIndex: 'courseKind',
            key: 'courseKind',
        }, {
            title: '课程学时',
            dataIndex: 'courseSchedule',
            key: 'courseSchedule',
        },{
            title: '课程学分',
            dataIndex: 'courseCredits',
            key: 'courseCredits',
        }];

        return (
            <Card title="课程查询" className="search-info-form-container">
                <TeacherCourseHeaderForm refreshTable={this.refreshData} data={this.state.data}/>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                />
            </Card>
        );
    }
}
