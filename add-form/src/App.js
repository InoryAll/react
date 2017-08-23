import React from 'react';
import { Form, Input, Icon, Button, Row } from 'antd';
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
        /*const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };*/
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <Row>
                    <FormItem

                        label={index === 0 ? '联系人' : ''}
                        required={false}
                        key={'name'+k}
                    >
                        {getFieldDecorator(`names-${k}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input placeholder="passenger name" style={{ width: '100%', marginRight: 8 }} />
                        )}
                        {keys.length >= 1 ? (
                            <a onClick={this.add}>
                                添加联系人
                            </a>
                        ) : null}
                    </FormItem>
                    <FormItem

                        label={index === 0 ? '联系电话' : ''}
                        required={false}
                        key={'phone'+k}
                    >
                    {getFieldDecorator(`phones-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        }],
                    })(
                        <Input placeholder="passenger name" style={{ width: '100%', marginRight: 8 }} />
                    )}
                    </FormItem>
                </Row>

                   /* <FormItem
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Passengers' : ''}
                        required={false}
                        key={k}
                    >
                        {getFieldDecorator(`names-${k}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
                        )}
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}

                        {getFieldDecorator(`names-${k}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input placeholder="passenger name" style={{ width: '30%', marginRight: 8 }} />
                        )}
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </FormItem>
                    <FormItem
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Passengers' : ''}
                        required={false}
                        key={k}
                    >
                        {getFieldDecorator(`names-${k}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
                        )}
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}

                        {getFieldDecorator(`names-${k}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input placeholder="passenger name" style={{ width: '30%', marginRight: 8 }} />
                        )}
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </FormItem>*/

            );
        });
        return (
            <Form onSubmit={this.handleSubmit} layout="inline">
                {formItems}
                <FormItem>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

export default  Form.create()(App);
