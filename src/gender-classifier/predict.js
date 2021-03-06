import * as tf from '@tensorflow/tfjs';
import { translit } from './translit.js';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadModel() {
    console.log('Loading model');
    let model = null;
    try {
        model = await tf.loadLayersModel("https://cors-anywhere-client.vercel.app/storage.googleapis.com/a1k28cloud/model/model.json");
    } catch(err) {
        console.log("Failed to fetch model from vercel, fetching from heroku...");
        model = await tf.loadLayersModel("https://cors-anywhere.herokuapp.com/storage.googleapis.com/a1k28cloud/model/model.json");
    }
    console.log('Model loaded');
    console.log(model);
	return model;
};
const MODEL = loadModel();

const MAXLEN = 18;
const VOCABLEN = 29;
const char_idx = {'T': 0, 'e': 1, 'p': 2, 's': 3, 'l': 4, "'": 5, 'k': 6, 
'n': 7, 'q': 8, 'v': 9, 'o': 10, ' ': 11, 'g': 12, 
'END': 13, 'i': 14, 'b': 15, '-': 16, 'h': 17, 't': 18, 
'f': 19, 'c': 20, 'r': 21, 'j': 22, 'z': 23, 'a': 24, 
'm': 25, 'd': 26, 'y': 27, 'u': 28}

function setFlag(i) {
  let tmp = new Array(VOCABLEN).fill(0);
  tmp[i] = 1;
  return tmp;
}

function min(a, b) {
    return a >= b ? a : b;
}

function namesToVecs(names) {
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

export async function predict(names) {
    names = translit(names);
    let X = namesToVecs(names);
    let ans = await MODEL.then((model) => {
        const res = model.predict(tf.tensor(X)).dataSync();
        let ans = []
        for (let i = 1; i < res.length; i+=2) {
            let isFemale = res[i];
            ans.push([names[Math.floor(i/2)], isFemale]);
        }
        return ans;
    });
    return ans[0];
}