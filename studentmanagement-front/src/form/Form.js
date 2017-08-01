import React from 'react';
import ReactDOM from 'react-dom';
import {Card,Layout,Row,Col} from 'antd';
import 'antd/dist/antd.css';
import './Form.css';
const {Header,Content} = Layout;
export default class Form extends  React.Component{

    render(){
        return (
            <Layout className="form-container">
                <Header className="form-header">
                    <div className="title">
                        学生管理系统
                    </div>
                </Header>
                <Content>
                    <div className="card-container">
                        <Row>
                            <Col span={12} offset={6}>
                                <Card className="form-padding" title="登录/注册">
                                    <Row>
                                        <Col span={12} offset={6}>
                                            {this.props.children}
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        );
    }
}