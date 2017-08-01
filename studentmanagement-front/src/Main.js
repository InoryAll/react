/*
*首页
* */
import React from 'react';
import 'antd/dist/antd.css';
import LogoGather from './components/LogoGather';
import {browserHistory} from 'react-router';


export default class Main extends React.Component{

    componentDidMount(){
        setTimeout(()=>{
            const path='/user/login';
            browserHistory.push(path);
        },5000);
    }

    render(){
        return(
               <LogoGather/>
        );
    }
}