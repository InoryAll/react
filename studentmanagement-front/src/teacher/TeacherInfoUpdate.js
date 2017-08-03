import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Card ,Input ,Row ,Col ,Modal
} from 'antd';
import 'isomorphic-fetch';
import 'whatwg-fetch';
import 'whatwg-fetch/fetch';
import {getCookie,setCookie} from "../util";
import {Link} from 'react-router';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class TeacherInfoUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:{}
        };
    }

    fetchData=()=>{
        fetch('http://localhost:8080/studentmanagement/TeacherAction',{
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
            this.setState({
                data:data.info
            });
        }).catch((e) => {
            console.log(e.message);
        });
    };

    componentDidMount(){
        this.fetchData();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            fetch('http://localhost:8080/studentmanagement/TeacherAction',{
                method:'POST',
                mode:'cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'id='+getCookie('username')+'&password='+values.password
                +'&name='+values.name+'&sex='+values.sex
                +'&nation='+values.nation+'&age='+values.age
                +'&department='+values.department +'&tel='+values.tel
                +'&action=updateInfo'
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                if (data.code==='0'){
                    Modal.error({
                        title: '失败',
                        content: '修改个人信息失败，请重试!'
                    });
                }
                else{
                    const modal=Modal.success({
                        title: '成功',
                        content: '修改成功!'
                    });
                    this.setState({
                        data:data.info
                    });
                    setTimeout(() => {
                        modal.destroy();
                    },1000);
                }
            }).catch((e) => {
                console.log(e.message);
            });
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 3,
                    offset: 11,
                },
            },
        };
        return (
            <Card title="个人信息修改" className="search-info-form-container">
                <Form className="search-info-form" onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="教师号:"
                    >
                        <span className="ant-form-text">{this.state.data.teaId}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码:"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码!'
                            }, {
                                validator: this.checkConfirm,
                            }],
                            initialValue:this.state.data.teaPassword
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请再次输入密码!'
                            }, {
                                validator: this.checkPassword,
                            }],
                            initialValue:this.state.data.teaPassword
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="姓名:"
                        hasFeedback
                    >
                        {getFieldDecorator('name',{
                            rules:[{required:true,message:'请输入姓名!'}],
                            initialValue:this.state.data.teaName
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别:"
                    >
                        {getFieldDecorator('sex',{
                            rules:[{required:true}],
                            initialValue:this.state.data.teaSex
                        })(
                            <RadioGroup>
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="民族:"
                        hasFeedback
                    >
                        {getFieldDecorator('nation',{
                            rules:[{ required:true,message:'请输入民族!'}],
                            initialValue:this.state.data.teaNation
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="年龄:"
                        hasFeedback
                    >
                        {getFieldDecorator('age',{
                            rules:[{required:true,message:'请输入年龄!'}],
                            initialValue:this.state.data.teaAge
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="专业:"
                    >
                        {getFieldDecorator('department', {
                            rules: [ {required : true, message: '请选择你的专业!'}],
                            initialValue:this.state.data.teaDepartment
                        })(
                            <Select placeholder="选择专业">
                                <Option value="软件工程">软件工程</Option>
                                <Option value="通信工程">通信工程</Option>
                                <Option value="物联网">物联网</Option>
                                <Option value="自动化">自动化</Option>
                                <Option value="计算机科学与技术">计算机科学与技术</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="电话:"
                        hasFeedback
                    >
                        {getFieldDecorator('tel',{
                            rules:[{required:true,message:'请输入电话!'}],
                            initialValue:this.state.data.teaTel
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Row>
                            <Col span={10}><Button type="primary" htmlType="submit">修改</Button></Col>
                            <Col span={10} offset={2}><Link to="/teacher">返回</Link></Col>
                        </Row>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

export const TeacherInfoUpdateForm = Form.create()(TeacherInfoUpdate);

