import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Teacher.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Teacher extends React.Component{
    render(){
        return (
            <Layout className="teacher-container">
                <Header className="header">
                    <div className="logo">
                        学生管理系统
                    </div>
                </Header>
                <Layout>
                    <Sider className="slider">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            className="menu"
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />个人信息管理</span>}>
                                <Menu.Item key="1">查看个人信息</Menu.Item>
                                <Menu.Item key="2">修改个人信息</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="book" />教师课程管理</span>}>
                                <Menu.Item key="3">查看所有课程</Menu.Item>
                                <Menu.Item key="4">添加新课程</Menu.Item>
                                <Menu.Item key="5">删除课程</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="team" />教师学生管理</span>}>
                                <Menu.Item key="6">查看选课学生</Menu.Item>
                                <Menu.Item key="7">查看学生评价</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="content-container">
                        <Content className="content">
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}