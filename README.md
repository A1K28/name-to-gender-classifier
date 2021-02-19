# Georgian name-to-gender classifier with 94%+ accuracy.
[See the static webapp on my github pages](https://a1k28.github.io/name-to-gender-classifier/).

[See the python code on my google colab here](https://colab.research.google.com/drive/1bj8WG2Wqngo7R_7G3RQW2tXz95RfA82D?usp=sharing).

## How it works:
All Georgian names (with count >= 5) are taken and used for training the model. 
In total ~14k names are used with approximately 45:55-F:M distribution.

## The Training:
We use a 2-stacked LSTM model with MAXLEN LSTM cells per stack. Each cell accepts a vector of length VOCABLEN.
In short, the input is represented with one-hot encoded vectors for names; such that each name is represented by a vector of shape (MAXLEN, VOCABLEN).

MAXLEN is a hyperparameter and VOCABLEN is derived after reading the input data (it depends on the char_idx dictionary, which is a map of all present characters to a number, e.g. 'a' : 0, and so on).

Moreover, we shuffle the train-test data for N iterations of M epochs each to help reduce overfitting.
I do not have much information on this after researching. It was simply a choice since I thought it would help the process.

## Future Improvements:
1. Use the count variable for each name to feed the LSTM cells more info about each name.
2. Aid overfitting even more (this is not so easy to fix without trial and error).
3. Maybe create my own model before getting a phd, but I doubt that it would be working better than now.

## Credits for the Model:
The model was constructed by [prdeepakbabu](https://github.com/prdeepakbabu) at [LSTM_RNN_architecture.jpg](https://github.com/prdeepakbabu/Python/blob/master/Deep%20learning%20gender/LSTM_RNN_architecture.jpg)
