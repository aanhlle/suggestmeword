//this is original version, I do hope that I can improve on this one or improve the app.js one more time code one day.
//https://stackoverflow.com/questions/66693516/how-to-return-the-values-in-the-order-of-the-data-passed-to-a-promise-in-a-loop/66693649

import { tokenize, getTokenizer } from "kuromojin";
import fetch from "node-fetch";
import fs from "fs";

const text = fs.readFileSync("text.txt", "utf8");
let result = [];
let tokenSet = new Set();

fs.writeFileSync("output.txt", "");

getTokenizer().then((tokenizer) => {});

tokenize(text)
  .then((results) => {
    // the result is an array of objects

    results.forEach((token) => {
      tokenSet.add(token.surface_form);
    });

    console.log("======Begin to find JLPT level for below items======");
    console.log([...tokenSet]);

    console.log("=====Begin parsing=====");

    return tokenSet.forEach((item) => {
      parseIntoJisho(item);
    });
  })
  .then((results) => {
    console.log("=====DONE=====");
  });

function parseIntoJisho(data) {
  fetch(encodeURI(`https://jisho.org/api/v1/search/words?keyword=${data}`))
    .then((res) => res.json())
    .then((jsondata) => {
      let JLPTvalueArray = jsondata.data[0].jlpt;
      let reading = jsondata.data[0].japanese[0].reading;
      let definition = jsondata.data[0].senses[0].english_definitions;

      if (JLPTvalueArray.length) {
        let jlptLevel = JLPTvalueArray.flatMap((str) => str.match(/\d+/));
        const max = Math.max(...jlptLevel);
        if (max < 3) {
          let output = data + "\t" + reading + "\t" + definition + "\n";
          fs.appendFileSync("output.txt", output);
        }
      } else console.log(data + " has no JLPT value.");
    })
    .catch(function (err) {
      console.log(err);
    });
  // console.log(result);
}
