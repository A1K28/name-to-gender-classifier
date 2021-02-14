import React, { Component } from 'react'

import './style/gender-classifier-app.css'
import * as tf from '@tensorflow/tfjs';

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
        let g = await predict([this.state.input]);
        this.setState({gender: g});
        console.log(g[1]);
        console.log(g[1]>0.5);
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadModel() {
    console.log('Loading model');
    // const model = await tf.loadModel('model.json');
    const model = await tf.loadLayersModel("http://127.0.0.1:8080/model/model.json");
    // const model = await tf.loadLayersModel("file:///Q:/scripts/github-io/gender-classifier-app/model/model.json");
    await sleep(2000);
    console.log('Model loaded');
    console.log(model);
	return model;
};
const MODEL = loadModel();

var dict = {
    "ა":'a',
    'ბ':'b'
}

function translit(names) {
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        console.log(name)
    }
}

var MAXLEN = 18;
var VOCABLEN = 29;
var char_idx = {'T': 0, 'e': 1, 'p': 2, 's': 3, 'l': 4, "'": 5, 'k': 6, 
'n': 7, 'q': 8, 'v': 9, 'o': 10, ' ': 11, 'g': 12, 
'END': 13, 'i': 14, 'b': 15, '-': 16, 'h': 17, 't': 18, 
'f': 19, 'c': 20, 'r': 21, 'j': 22, 'z': 23, 'a': 24, 
'm': 25, 'd': 26, 'y': 27, 'u': 28}

function main() {
    translit(['asd', 'ASD'])
}

function setFlag(i) {
  let tmp = new Array(VOCABLEN).fill(0);
  tmp[i] = 1;
  return tmp;
}

function min(a, b) {
    return a >= b ? a : b;
}

function namesToVec(names) {
    let X = []
    for (let i = 0; i < names.length; i++) {
        let name = names[i].substring(0, min(MAXLEN, names[i].length));
        let tmp = []
        for (let j = 0; j < name.length; j++) {
            if (char_idx[name[j]] !== undefined) {
                tmp.push(setFlag(char_idx[name[j]]));
            } else {
                tmp.push(setFlag(char_idx[' ']));
            }
        }
        for (let j = 0; j < MAXLEN-name.length; j++) {
            tmp.push(setFlag(char_idx['END']))
        }
        X.push(tmp);
    }
    return X;
}

async function predict(names) {
    let X = namesToVec(names);
    console.log(names);
    let ans = await MODEL.then((model) => {
        const res = model.predict(tf.tensor(X)).dataSync();
        let ans = []
        for (let i = 1; i < res.length; i+=2) {
            let isFemale = res[i];
            ans.push([names[Math.floor(i/2)], isFemale.toExponential(2)]);
        }
        return ans;
    });
    return ans[0];
}

// predict(['asd','asdf']).then((e) => {console.log(e)});