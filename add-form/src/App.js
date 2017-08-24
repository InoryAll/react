import React from 'react';
import { Form, Input, Icon, Button, Row, Col, message } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

const FormItem = Form.Item;

let uuid = 0;
class App extends React.Component {
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });

        if (keys.length>=5){
            message.error('最多只能添加5个联系人');
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };

        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <Row>
                    <Row type="flex" justify="center">
                        <Col span="6">
                            <FormItem
                                {...formItemLayout}
                                label={'联系人'}
                                required={false}
                                key={'name'+k}
                            >
                                {getFieldDecorator(`names-${k}`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        message: "请输入联系人",
                                    }],
                                })(
                                    <Input placeholder="联系人" style={{ width: '60%' , marginRight:8}} />
                                )}
                                {index === 0 && keys.length <= 5 ? (
                                    <a onClick={this.add}>
                                        添加联系人
                                    </a>
                                ) : <a onClick={()=>this.remove(k)}>
                                    删除联系人
                                </a>}
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem
                                {...formItemLayout}
                                label={ '联系电话' }
                                required={false}
                                key={'phone'+k}
                            >
                                {getFieldDecorator(`phones-${k}`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        message: "请输入联系电话",
                                    }],
                                })(
                                    <Input placeholder="联系电话" style={{ width: '60%' }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="6">
                            <FormItem
                                {...formItemLayout}
                                label={'微信'}
                                required={false}
                                key={'weChat'+k}
                            >
                                {getFieldDecorator(`weChats-${k}`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        message: "请输入微信号",
                                    }],
                                })(
                                    <Input placeholder="微信" style={{ width: '60%' }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem
                                {...formItemLayout}
                                label={ 'QQ' }
                                required={false}
                                key={'qq'+k}
                            >
                                {getFieldDecorator(`qqs-${k}`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        message: "请输入QQ",
                                    }],
                                })(
                                    <Input placeholder="QQ" style={{ width: '60%' }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span="6">
                            <FormItem
                                {...formItemLayout}
                                label={'邮箱'}
                                required={false}
                                key={'email'+k}
                            >
                                {getFieldDecorator(`emails-${k}`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        message: "请输入邮箱",
                                    }],
                                })(
                                    <Input placeholder="邮箱" style={{ width: '60%' }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem
                                {...formItemLayout}
                                label={ '其他' }
                                required={false}
                                key={'other'+k}
                            >
                                {getFieldDecorator(`others-${k}`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        message: "请输入其他",
                                    }],
                                })(
                                    <Input placeholder="其他" style={{ width: '60%' }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Row>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <Row>
                    <Col span="8" offset="16">
                        <FormItem>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default  Form.create()(App);
