import fetch from 'node-fetch';
import fs from "fs";

/* @param data is string */

let result = [];

export function parseIntoJisho(data) {
  fetch(encodeURI(`https://jisho.org/api/v1/search/words?keyword=${data}`))
    .then(res => res.json())
    .then(jsondata => {
      let JLPTvalueArray = jsondata.data[0].jlpt;
      let reading = jsondata.data[0].japanese[0].reading;
      let definition = jsondata.data[0].senses[0].english_definitions;

      if (JLPTvalueArray.length) {
        let jlptLevel = JLPTvalueArray.flatMap(str => str.match(/\d+/));
        const max = Math.max(...jlptLevel);
        if (max >= 3) {
          return -1 // console.log(data + " is of JLPT level N3 or above.")
        } else {
          let output = data + "\t" + reading + "\t" + definition + "\n";
          fs.appendFileSync("output.txt", output);
        }
      } // console.log(data + " has no JLPT value.")
    })
    .catch(function(err) {
      console.log("No data for " + data);
    })

  // console.log(result);

}
