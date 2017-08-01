import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import './Teacher.css';

export default class TeacherCarousel extends React.Component{
    render(){
        return (
            <div className="carousel-container">
                <Carousel autoplay>
                    <div><h3>严格把关教学质量</h3></div>
                    <div><h3>以学生作为工作的中心</h3></div>
                    <div><h3>端正自己,给学生做榜样</h3></div>
                    <div><h3>加强创新型教育模式</h3></div>
                </Carousel>
            </div>
        );
    }
}