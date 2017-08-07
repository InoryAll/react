import React from 'react';
import ReactDOM from 'react-dom';
import {StudentCourseHeaderForm} from './StudentCourseHeader';
import {Card,Icon,Modal,Table} from 'antd';
import {getCookie} from "../../util";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getStudentCourse} from  '../../action/actions';

class StudentCourseSearch extends React.Component{
    constructor(props){
        super(props);
        /*this.state={
            data:[]
        };*/
    }

    fetchData=() => {
      /*  fetch('http://localhost:8080/studentmanagement/StudentAction',{
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
        });*/
    };

    refreshData=(data) => {
       /* this.setState({
            data:data
        });*/
    };

    componentDidMount(){
       /* this.fetchData();*/
        this.props.getStudentCourse(getCookie('username'));

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
        }];
        console.log(this.props.courses);
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

function mapStateToProps(state){
    return {
        courses:state.course
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getStudentCourse },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentCourseSearch);
