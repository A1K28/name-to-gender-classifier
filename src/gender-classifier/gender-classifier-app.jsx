import React, { Component } from 'react'

import './style/gender-classifier-app.css'
import { predict } from './predict.js';

export default class GenderClassifierApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "ASD",
            gender: [,]
        }
    }

    componentDidMount() {}

    handleChange = (e) => {
        this.setState({input: e.target.value})
    }

    predict = async() => {
        if (this.state.input.length>0){
            let g = await predict([this.state.input]);
            this.setState({gender: g});   
        } else {
            this.setState({gender: [,]});
        }
    }

    render() {
        return (
            <div>
                <div className='GI'>
                    <input className='gender-input' type="text" onChange={ this.handleChange } />
                    <input
                        type="button"
                        className='gender-button'
                        value="Alert the text input"
                        onClick={this.predict}
                    />
                </div>
                <div 
                className='result-text' 
                style={{color : this.state.gender[1] > 0.5 ? 'violet' : 'cyan'}}>
                    {this.state.gender[0]} {this.state.gender[1]}
                </div>
            </div>
        )
    }
}