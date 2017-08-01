import React from 'react';
import ReactDOM from 'react-dom';
import {Card,Layout,Row,Col,Form,Icon,Input,Button,Checkbox,Radio,Modal} from 'antd';
import 'antd/dist/antd.css';
import './Form.css';
import {Link,browserHistory} from 'react-router';
import 'isomorphic-fetch';
import {polyfill} from 'es6-promise';
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min';

polyfill();

const {Header,Content} = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Login extends  React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                    console.log('Received values of form: ', values);
                    if (values.role==='student'){
                            fetch('http://localhost:8080/studentmanagement/StudentAction', {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: 'id='+values.id+"&password="+values.password+"&action=login"
                            }).then((response) => {
                                console.log(response);
                                if (response.ok){
                                    return response.json();
                                }
                            }).then((data)=>{
                                if (data.code==='0'){
                                    Modal.error({
                                        title: '错误',
                                        content: data.message,
                                    });
                                }
                                else
                                {
                                    const modal=Modal.success({
                                        title: '成功',
                                        content: data.message,
                                    });
                                    setTimeout(()=>{
                                        modal.destroy();
                                        /*学生登录成功，跳转*/
                                    },1000);
                                }
                            }).catch((e)=>{
                                console.log(e.message);
                            });
                        }
                    if (values.role==='teacher'){
                        fetch('http://localhost:8080/studentmanagement/TeacherAction',{
                            method:'POST',
                            mode:'cors',
                            headers:{
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: 'id='+values.id+"&password="+values.password+"&action=login"
                        }).then((response) => {
                            console.log(response);
                            if (response.ok){
                                return response.json();
                            }
                        }).then((data) => {
                            if (data.code==='0'){
                                Modal.error({
                                    title: '错误',
                                    content: data.message,
                                });
                            }
                            else
                            {
                                const modal=Modal.success({
                                    title: '成功',
                                    content: data.message,
                                });
                                setTimeout(()=>{
                                    modal.destroy();
                                    /*教师登录成功，跳转*/
                                },1000);
                            }
                        }).catch((e)=>{
                            console.log(e.message);
                        });
                    }
                }
            });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12,offset:4 }
        };

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="请选择角色:"
                >
                    {getFieldDecorator('role',{
                        initialValue:'student'
                    })(
                        <RadioGroup>
                            <Radio value="student">学生</Radio>
                            <Radio value="teacher">教师</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住用户</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    Or <Link to="/user/register">立马注册!</Link>
                </FormItem>
            </Form>
        );
    }
}

export const LoginForm = Form.create()(Login);