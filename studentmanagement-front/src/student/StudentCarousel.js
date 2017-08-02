import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel,Row,Col } from 'antd';


export default class StudentCarousel extends React.Component{
    render(){
        return (
            <div className="carousel-container">
                <Carousel autoplay>
                    <div><h3>好好学习，天天向上</h3></div>
                    <div><h3>不轻易放弃</h3></div>
                    <div><h3>坚持自己的理想</h3></div>
                    <div><h3>严格要求自己</h3></div>
                </Carousel>
            </div>
        );
    }
}