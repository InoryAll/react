import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Link} from 'react-router';
import '../Student.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Student extends React.Component{
    render(){
        return (
            <Layout className="student-container">
                <Header className="header">
                    <div className="logo">
                        学生管理系统
                    </div>
                </Header>
                <Layout className="layout-box">
                    <Sider className="slider">
                        <Menu
                            mode="inline"
                            className="menu"
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />个人信息管理</span>}>
                                <Menu.Item key="1"><Link to="/student/info/search">查看个人信息</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/student/info/update">修改个人信息</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="book" />个人课程管理</span>}>
                                <Menu.Item key="3"><Link to="/student/course/search">查看已选课程</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/student/course/select">选课</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/student/course/delete">删除已选课程</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="like-o" />教学质量评价</span>}>
                                <Menu.Item key="6"><Link to="/student/judge/search">查看已评价的课程</Link></Menu.Item>
                                <Menu.Item key="7"><Link to="/student/judge/dojudge">查看需要评价的课程</Link></Menu.Item>
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