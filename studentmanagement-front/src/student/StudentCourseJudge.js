import React from 'react';
import ReactDOM from 'react-dom';
import {StudentCourseHeaderForm} from './StudentCourseHeader';
import {Card,Icon,Modal,Table,Rate,Row,Col,Input} from 'antd';
import {getCookie} from "../util";

const { TextArea }=Input;

export default class StudentCourseJudge extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            visible:false,
            handleIndex:-1,
            appearance:0,
            quality:0,
            atmosphere:0,
            method:0,
            attitude:0,
            other:''
        };
    }

    showModal = (index) => {
        this.setState({
            visible: true,
            handleIndex:index
        });
    };

    handleOk = (e) => {
        const dataSource=[...this.state.data];
        const handleItem=dataSource[this.state.handleIndex];

        this.setState({
            visible: false,
        });
        fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'action=judgeCourse'+'&stuId='+getCookie('username')
                +'&courseId='+handleItem.courseId
                +'&teaId='+handleItem.teaId
                +'&appearance='+this.state.appearance
                +'&quality='+this.state.quality
                +'&atmosphere='+this.state.atmosphere
                +'&method='+this.state.method
                +'&attitude='+this.state.attitude
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title:'失败',
                    content:data.message
                });
            }
            else{
                const modal=Modal.success({
                    title:'成功',
                    content:data.message
                });
                const selectItem=dataSource.splice(this.state.handleIndex,1);
                this.setState({
                    data:dataSource
                });
                setTimeout(()=>{
                    modal.destroy();
                },1000);
            }
        }).catch((e) => {
            console.log(e.message);
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    fetchData=() => {
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
                    <a href="#" onClick={()=>{this.showModal(index)}}>评价 <span className="ant-divider" /><Icon type="like-o" /></a>
                </span>
            ),
        }];

        return (
            <Card title="评价课程" className="search-info-form-container">
                <StudentCourseHeaderForm refreshTable={this.refreshData}/>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                />
                <Modal
                    title="课程评价"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Row className="judge-info">
                        <Col span={12} offset={6}>
                            <strong className="judge-title">课程号:</strong>
                            <span className="judge-detail">
                                {
                                   this.state.data[this.state.handleIndex] ? this.state.data[this.state.handleIndex].courseId:' '
                                }
                            </span>
                        </Col>
                    </Row>
                    <Row className="judge-info">
                        <Col span={12} offset={6}>
                            <strong className="judge-title">课程名:</strong>
                            <span className="judge-detail">
                                {
                                    this.state.data[this.state.handleIndex] ? this.state.data[this.state.handleIndex].courseName:' '
                                }
                            </span>
                        </Col>
                    </Row>
                    <Row className="judge-info">
                        <Col span={12} offset={6}>
                            <strong className="judge-title">教师号:</strong>
                            <span className="judge-detail">
                                {
                                    this.state.data[this.state.handleIndex] ? this.state.data[this.state.handleIndex].teaId:' '
                                }
                            </span>
                        </Col>
                    </Row>
                    <Row className="judge-info">
                        <Col span={12} offset={6}>
                            <strong className="judge-title">教师名:</strong>
                            <span className="judge-detail">
                                {
                                    this.state.data[this.state.handleIndex] ? this.state.data[this.state.handleIndex].teaName:' '
                                }
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>
                            <strong className="judge-label">教师外表:</strong>
                            <Rate onChange={(value)=>{this.setState({appearance:value})}} value={this.state.appearance} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>
                            <strong className="judge-label">教学质量:</strong>
                            <Rate onChange={(value)=>{this.setState({quality:value})}} value={this.state.quality} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>
                            <strong className="judge-label">课堂氛围:</strong>
                            <Rate onChange={(value)=>{this.setState({atmosphere:value})}} value={this.state.atmosphere} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>
                            <strong className="judge-label">教学方法:</strong>
                            <Rate onChange={(value)=>{this.setState({method:value})}} value={this.state.method} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>
                            <strong className="judge-label">教学态度:</strong>
                            <Rate onChange={(value)=>{this.setState({attitude:value})}} value={this.state.attitude} />
                        </Col>
                    </Row>
                </Modal>
            </Card>
        );
    }
}
