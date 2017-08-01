import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

export default class Init extends React.Component{
    render(){
        return (
            <div className="background-wapper">
                {this.props.children}
            </div>
        );
    }
}