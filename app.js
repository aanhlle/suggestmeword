import {
  tokenize,
  getTokenizer
} from "kuromojin";
import {
  parseIntoJisho
} from "./parseintojisho.js";
import fs from "fs";


const text = fs.readFileSync('text.txt', 'utf8');

fs.writeFileSync('output.txt', '')

let tokenSet = new Set();

getTokenizer().then(tokenizer => {});

tokenize(text).then(results => { // the result is an array of objects

  results.forEach((token) => {
    tokenSet.add(token.surface_form);
  })

  // console.log("======Begin to find JLPT level for below items======");
  // const tokenSetArray = [...tokenSet];
  // console.log(tokenSetArray);

  console.log("=====Begin parsing=====")

  tokenSet.forEach((item) => {
    parseIntoJisho(item);
  });
})
