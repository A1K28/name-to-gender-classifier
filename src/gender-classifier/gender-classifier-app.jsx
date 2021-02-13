import React, { Component } from 'react'

import './style/gender-classifier-app.css'
import * as tf from '@tensorflow/tfjs';

export default class GenderClassifierApp extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className="gender-classifier-app">
            ASD
        </div>
    }
}

async function init() {
    const model = await tf.loadLayersModel('../../model/model.json')
}