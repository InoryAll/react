import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete , Radio} from 'antd';
import RadioGroup from "antd/es/radio/group";
import {Link} from 'react-router'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const departments = [{
    value: '软件工程',
    label: '软件工程'
}, {
    value: '计算机科学与技术',
    label: '计算机科学与技术'
},{
    value: '自动化',
    label: '自动化'
}];


class Register extends React.Component{
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    checkId=(rule,value,callback) => {
        const reg=/^\d{8}$/;
        if (value && !reg.test(value) && value.length!==0){
            callback('用户名应为8位纯数字!');
        }
        else
        {
            callback();
        }
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

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户名:"
                    hasFeedback
                >
                    {getFieldDecorator('id', {
                        rules: [ {
                            required: true, message: '请输入用户名!'
                        },{
                            validator:this.checkId
                        }],
                    })(
                        <Input placeholder="用户名(8位纯数字学号)"/>
                    )}
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
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="姓名:"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入你的姓名!' }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别">
                    {getFieldDecorator('sex',{
                            initialValue:'男',
                            rules:[{required:true}]
                        })(
                            <RadioGroup>
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </RadioGroup>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="民族"
                    hasFeedback
                >
                    {getFieldDecorator('nation',{
                            rules:[{ required : true , message : '请输入民族!' }]
                        })(
                            <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="年龄:"
                    hasFeedback
                >
                    {getFieldDecorator('age',{
                        rules:[{ required : true , message : '请输入你的年龄!'}]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="专业:"
                >
                    {getFieldDecorator('department', {
                        rules: [ {required : true, message: '请选择你的专业!'}]
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
                    label="班级:"
                    hasFeedback
                >
                    {getFieldDecorator('class',{
                        rules:[{ required : true , message : '请输入你的班级!'}]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码:"
                    hasFeedback
                >
                    {getFieldDecorator('tel', {
                        rules: [{ required: true, message: '请输入你的手机号码!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Row>
                        <Col span={8}><Button type="primary" htmlType="submit">注册</Button></Col>
                        <Col span={14} offset={2}><Button type="default" htmlType="button"><Link to="/user/login">返回登录</Link></Button></Col>
                    </Row>
                </FormItem>
            </Form>
        );
    }
}

export const RegisterForm = Form.create()(Register);

