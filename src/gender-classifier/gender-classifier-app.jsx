import React, { Component } from 'react';

import './style/common.css';
import './style/gender-classifier-app.css';
import './style/my-input.css';
import { ReactComponent as ArrowSvg } from '../arrow-up.svg';
import { predict } from './predict.js';

export default class GenderClassifierApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: [,],
            arrowPos: 48.5
        }
    }

    componentDidMount() {}

    handleChange = (e) => {
        this.setState({input: e.target.value})
    }

    predict = async() => {
        let g = [,]
        if (this.state.input.length>0){
            g = await predict([this.state.input]);   
        }
        let num = g[1];
        g[1] = (1-num).toExponential(4);
        this.setState({gender: g});
        this.handleColor(num);
        this.handleArrowPos(num);
    }

    handleColor = (num) => {
        let color = "#9832ff";
        if (num >= 0.78) {
            color = "#fe007f";
        } else if (num <= 0.22) {
            color = "#00b8e7";
        }
        this.setState({color: color});
    }

    handleArrowPos = (num) => {
        num = 100-num*100;
        num = normalizeArrow(num);
        this.setState({arrowPos: num});
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
                    <span style={{fontFamily:'MyFont', color:'white'}}>პასუხი:</span> {this.state.gender[0]} {this.state.gender[1]}
                </div>
                <div className='result-bar'>
                    <div className='result-bar-1'></div>
                    <div className='result-bar-2'></div>
                    <div className='result-bar-3'></div>
                    <div className='arrow' style={{left: `${this.state.arrowPos}%`}}>
                        <ArrowSvg />
                    </div>
                </div>
                <div className='footer'>
                    <div>სიზუსტე: 94%+</div>
                    <div>GitHub repo & Google Colab: <a href="https://github.com/A1K28/name-to-gender-classifier">https://github.com/A1K28/name-to-gender-classifier</a></div>
                </div>
            </div>
        )
    }
}

function normalizeArrow(num) {
    return -0.0098*(num**2)+1.96*num;
}