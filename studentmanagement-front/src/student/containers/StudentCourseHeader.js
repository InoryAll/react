import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Radio, Select, Modal } from 'antd';
import '../Student.css';
import 'isomorphic-fetch';
import 'whatwg-fetch';
import 'whatwg-fetch/fetch';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getFilterInitial} from "../../action/actions";

const FormItem = Form.Item;
const Option = Select.Option;

class StudentCourseHeader extends React.Component{
    constructor(props) {
        super(props);
       /* this.state = {
            courses: [''],
            teachers: ['']
        };*/
    }


    fetchData=() => {
        /*fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'action=initialSearch'
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
                    courses:data.courses,
                    teachers:data.teachers
                });

            }
        }).catch((e) => {
            console.log(e.message);
        });*/
    };

    componentDidMount(){
       /* this.fetchData();*/
       this.props.getFilterInitial();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
           /* let data=this.props.data;
            let result=[];
            for (let i=0;i<data.length;i++){
                if (values.courseName===undefined&&values.teaName===undefined){
                    result.push(data[i]);
                }
                if (values.courseName===undefined&&values.teaName!==undefined){
                    if (values.teaName===data[i].teaName){
                        result.push(data[i]);
                    }
                }
                if (values.courseName!==undefined&&values.teaName===undefined){
                    if (values.courseName===data[i].courseName){
                        result.push(data[i]);
                    }
                }
                if (values.courseName!==undefined&&values.teaName!==undefined){
                    if (values.courseName===data[i].courseName&&values.teaName===data[i].teaName){
                        result.push(data[i]);
                    }
                }
            }
            this.props.refreshTable(result);*/
        });
    };


    render(){
        const { getFieldDecorator } = this.props.form;
        console.log(this.props.courses);
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit} className="search-conditions">
                    <FormItem
                        label="课程名:"
                    >
                        {getFieldDecorator('courseName')(
                            <Select
                                showSearch
                                placeholder="要查询的课程名"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                className="courseNameSelect"
                            >
                                {
                                    this.props.courses.map((value) => {
                                        return <Option key={value} value={value}>{value}</Option>;
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="教师名:"
                    >
                        {getFieldDecorator('teaName')(
                            <Select
                                showSearch
                                placeholder="要查询的教师名"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                className="teacherNameSelect"
                            >
                                {
                                    this.props.teachers.map((value) => {
                                        return <Option key={value} value={value}>{value}</Option>;
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="default" htmlType="submit">查询</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        courses:state.courseFilter.courses,
        teachers:state.courseFilter.teachers
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFilterInitial },dispatch);
}

export const StudentCourseHeaderF=Form.create()(StudentCourseHeader);
export const StudentCourseHeaderForm=connect(mapStateToProps,mapDispatchToProps)(StudentCourseHeaderF);