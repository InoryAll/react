import React from 'react';
import ReactDOM from 'react-dom';
import {StudentCourseHeaderForm} from './StudentCourseHeader';
import {Card,Icon,Modal,Table,Popconfirm} from 'antd';
import {getCookie} from "../../util";
import {getStudentCourse,doDelete} from "../../action/actions";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class StudentCourseDelete extends React.Component{
    constructor(props){
        super(props);
        /*this.state={
            data:[]
        };*/
    }

    /*fetchData=() => {
        fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'action=selectedCourse'+'&stuId='+getCookie('username')
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
    };*/

    /*refreshData=(data) => {
        this.setState({
            data:data
        });
    };*/

    componentDidMount(){
        this.props.getStudentCourse(getCookie('username'));
    }

    onDelete=(index)=>{
       /* const dataSource=[...this.state.data];

        fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'action=deleteCourse'+'&stuId='+getCookie('username')+'&courseId='+dataSource[index].courseId
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title:'失败',
                    message:data.message
                });
            }
            else{
                const modal=Modal.success({
                    title:'成功',
                    message:data.message
                });
                const deletedItem=dataSource.splice(index,1);
                this.setState({
                    data:dataSource
                });
                setTimeout(()=>{
                    modal.destroy();
                },1000);
            }
        }).catch((e) => {
            console.log(e.message);
        });*/
        this.props.doDelete(index,getCookie('username'));
    };

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
            title: '教师号',
            dataIndex: 'teaId',
            key: 'teaId',
        },{
            title: '教师名',
            dataIndex: 'teaName',
            key: 'teaName',
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
        },{
            title: '操作',
            key: 'action',
            render: (text, record,index) => (
                <span>
                    <Popconfirm title="确定要删除么?" onConfirm={() => this.onDelete(index)}>
                        <a href="#">删除 <span className="ant-divider" /> <Icon type="close" /></a>
                    </Popconfirm>
                </span>
            ),
        }];

        return (
            <Card title="选课查询" className="search-info-form-container">
                <StudentCourseHeaderForm />
                <Table
                    columns={columns}
                    dataSource={this.props.courses}
                />
            </Card>
        );
    }
}


function mapStateToProps(state) {
    return {
        courses:state.course.courses
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getStudentCourse , doDelete },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentCourseDelete);