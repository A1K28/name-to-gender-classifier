import React, { Component } from 'react';

import './style/common.css';
import './style/gender-classifier-app.css';
import './style/my-input.css';
import { predict } from './predict.js';

export default class GenderClassifierApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: [,]
        }
    }

    componentDidMount() {}

    handleChange = (e) => {
        this.setState({input: e.target.value})
    }

    handleColor = () => {
        this.setState({color: this.state.gender[1] > 0.5 ? 'violet' : 'cyan'})
    }

    predict = async() => {
        let g = [,]
        if (this.state.input.length>0){
            g = await predict([this.state.input]);   
        }
        this.setState({gender: g});
        this.handleColor();
    }

    render() {
        return (
            <div>
                <div className='GI'>
                    {/* <input className='gender-input' type="text" onChange={ this.handleChange } /> */}
                    <div className="GI-child" id="container">
                        <div className="chat-bubble" id="ghost-bubble"></div>
                        <input id="ghost-input" type="text" placeholder="ჩაწერეთ სახელი" onChange={ this.handleChange } />
                        <div className="ghost">
                            <div className="ghost__face">
                                <div className="ghost__eyes">
                                    <div className="ghost__eyes-l"></div>
                                    <div className="ghost__eyes-r"></div>
                                </div>
                                <div className="ghost__mouth"></div>
                            </div>
                            <div className="ghost__torso"></div>
                            <div className="ghost__hands">
                                <div className="ghost__hands-l"></div>
                                <div className="ghost__hands-r"></div>
                            </div>
                            <div className="ghost__legs"></div>
                        </div>
                    </div>
                    <div className="GI-child">
                        <input
                            style={{fontFamily:'MyFont', cursor:'pointer'}}
                            type="button"
                            className='gender-button'
                            value="გამოიცანი სქესი!"
                            onClick={this.predict}
                        />
                    </div>
                </div>
                <div 
                className='result-text' 
                style={{color : this.state.color}}>
                    {this.state.gender[0]} {this.state.gender[1]}
                </div>
            </div>
        )
    }
}