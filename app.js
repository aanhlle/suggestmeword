import { tokenize, getTokenizer } from "kuromojin";
import fetch from "node-fetch";
import fs, { read } from "fs";

const text = fs.readFileSync("text.txt", "utf8");

let result = [];
let tokenSet = new Set();

fs.writeFileSync("output.txt", "");

const parseIntoJisho = (data) =>
  fetch(encodeURI(`https://jisho.org/api/v1/search/words?keyword=${data}`))
    .then((res) => res.json())
    .then((jsondata) => {
      let JLPTvalueArray = jsondata.data[0].jlpt;
      let reading = jsondata.data[0].japanese[0].reading;
      let definition = jsondata.data[0].senses[0].english_definitions;
      return [data, JLPTvalueArray, reading, definition];
    })
    .catch((err) => console.log("Couldn't find data for: " + data));

getTokenizer().then((tokenizer) => {});

tokenize(text).then((results) => {
  results.forEach((token) => {
    tokenSet.add(token.surface_form);
  });

  let filteredArray = [...tokenSet].filter(function (el) {
    return !/[＜＞！「」（）“”、。’`\w\s\d]/u.test(el); //add to this list the character you want to filter out
  });

  console.log("======Begin to find JLPT level for below items======");

  console.log(`Tokenized items\n ${filteredArray}`);

  Promise.all(filteredArray.map(parseIntoJisho))
    .then((results) => {
      for (const result of results) {
        if (!result) continue;

        let [data, jlpt, reading, definition] = result;

        if (jlpt.length) {
          const jlptLevel = jlpt.flatMap((str) => str.match(/\d+/));
          const max = Math.max(...jlptLevel);

          // edit this if you want another JLPT level threshold e.g max < 4 == JLPT N3 or below
          if (max < 3) {
            let output = data + "\t" + reading + "\t" + definition + "\n";
            fs.appendFileSync("output.txt", output);
          }
        }
      }
    })
    .catch((err) => console.log(err))
    .finally(() => console.log("======DONE======"));
});
