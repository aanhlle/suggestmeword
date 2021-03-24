# SuggestMeWord(s)

> "It would be nice that when I want to read a text, I would be given a list of words appearing in that text so that I could study it beforehand."

https://afoucaul.github.io/2018/06/17/extracting-vocabulary-from-a-japanese-text.html

Tired of unknown words when you read Japanese? How about subtracting all the hard words and review them first beforehand. This script helps you do that.

## Install

Make sure you have installed [Node.js](https://nodejs.org/).
Open the terminal in the folder where you have downloaded SuggestMeWord, type the following:

```sh
npm install
```

## Run the script

1. Paste your text in file `text.txt`, save it. Do not change the file name.
2. Open the terminal in the same folder where `app.js` resides.
3. Type the following command:

```sh
node app.js
```

Wait for the program to finish. The suggested words for you to learn will appear in `output.txt`

## How it works?

This script utilizes a Japanese parser called Kuromoji via a package [Kuromojin](https://www.npmjs.com/package/kuromojin) to split your text into small words.

Then it fetches JLPT data from the Jisho API to determine words' difficulty.

Finally, it outputs those difficult words (with meaning for your quick review) to `output.txt`.
Current words' difficulty is set to JLPT N2 or below. You can change it easily by raising the threshold `if (max < 3) ` in the `app.js` file.


e.g. `if (max < 4)` to output words with JLPT N3 or below.
