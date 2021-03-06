import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon,Card,Modal
} from 'antd';
import 'isomorphic-fetch';
import 'whatwg-fetch';
import 'whatwg-fetch/fetch';
import {getCookie,setCookie} from "../../util";
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getStudentInfo} from '../../action/actions';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class StudentInfoShow extends React.Component{

    constructor(props){
        super(props);
       /* this.state={
            data:{}
        };*/
    }

    fetchData=()=>{
      /*  fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'id='+getCookie('username')+'&action=searchInfo'
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title: '失败',
                    content: '查询个人信息失败，请重试!'
                });
            }
            else {
                this.setState({
                    data:data.info
                });
            }
        }).catch((e) => {
            console.log(e.message);
        });*/
    };

    componentDidMount(){
        /*this.fetchData();*/
        this.props.getStudentInfo(getCookie('username'));
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 2,
                    offset: 12,
                },
            },
        };
        return (
            <Card title="个人信息查询" className="search-info-form-container">
                <Form className="search-info-form">
                    <FormItem
                        {...formItemLayout}
                        label="学号:"
                    >
                        <span className="ant-form-text">{this.props.student.stuId}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="姓名:"
                    >
                        <span className="ant-form-text">{this.props.student.stuName}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别:"
                    >
                        {getFieldDecorator('role',{
                            initialValue:this.props.student.stuSex
                        })(
                            <RadioGroup>
                                <Radio value="男" disabled>男</Radio>
                                <Radio value="女" disabled>女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="民族:"
                    >
                        <span className="ant-form-text">{this.props.student.stuNation}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="年龄:"
                    >
                        <span className="ant-form-text">{this.props.student.stuAge}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="专业:"
                    >
                        <span className="ant-form-text">{this.props.student.stuDepartment}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="班级:"
                    >
                        <span className="ant-form-text">{this.props.student.stuClass}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="电话:"
                    >
                        <span className="ant-form-text">{this.props.student.stuTel}</span>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Link to="/student">返回</Link>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        student:state.student
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getStudentInfo},dispatch);
}

export const StudentInfoShowF = Form.create()(StudentInfoShow);

export const StudentInfoShowForm=connect(mapStateToProps,mapDispatchToProps)(StudentInfoShowF);
