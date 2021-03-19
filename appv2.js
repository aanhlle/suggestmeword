// as you may notice the returning values are not in the order of the passed tokens. I was trying to tackle this issue in this script. This script does nothing to the original code and is just meant to be a clone version of app.js. As of the time I haven't solved the issue yet :(.
// https://stackoverflow.com/questions/66693516/how-to-return-the-values-in-the-order-of-the-data-passed-to-a-promise-in-a-loop/66693649

import {
  tokenize,
  getTokenizer
} from "kuromojin";
import fetch from 'node-fetch';
// import {
//   parseIntoJisho
// } from "./parseintojisho.js";

const text = "日本語が上手ですね！";
let tokenSet = new Set();

const parseIntoJisho = data =>
  fetch(encodeURI(`https://jisho.org/api/v1/search/words?keyword=${data}`))
  .then(res => res.json())
  .then(jsondata => jsondata.data[0].jlpt)
  .catch(err => console.log("Couldn't find data for: " + data));


getTokenizer().then(tokenizer => {});

tokenize(text).then(results => { // the result is an array of objects


  results.forEach((token) => {
    tokenSet.add(token.surface_form);
  })

  console.log("======Begin to find JLPT level for below items======");

  const tokenSetArray = [...tokenSet];

  console.log(tokenSetArray);

  // appendJLPTtoValue(tokenSetArray);

  let returnedJLPTValue = [];

  // Promise.all(tokenSetArray.map(parseIntoJisho))
  //   .then((results) => {
  //     for (const result of results) {
  //       if (!result) continue;
  //       if (result.length) {
  //         const jlptLevel = result.flatMap(str => str.match(/\d+/));
  //         const max = Math.max(...jlptLevel);
  //         if (max >= 3) {
  //           console.log(" is of JLPT level N3 or above.");
  //         } else console.log(" is of JLPT level N1 or N2.");
  //       } else console.log(" has no JLPT value.");
  //     }
  //   })

  Promise.all(tokenSetArray.map(parseIntoJisho))
    .then((results) => {
      let returnedJLPTValue = [];

      for (const result of results) {
        if (!result) continue;
        if (result.length) {
          const jlptLevel = result.flatMap(str => str.match(/\d+/));
          const max = Math.max(...jlptLevel);
          if (max >= 3) {
            returnedJLPTValue.push(" is of JLPT level N3 or above.");
            console.log("pushed >n3");
          } else {
            returnedJLPTValue.push(" is of JLPT level N1 or N2.");
            console.log("pushed n1/n2");
          }
        } else {
          returnedJLPTValue.push(" has no JLPT value.");
          console.log("pushed none");
        }
      }

    })
})

// function appendJLPTtoValue(array) {
//
//   let returnedJLPTValue = [];
//
//   Promise.all(array.map(parseIntoJisho))
//     .then((results) => {
//       for (const result of results) {
//         if (!result) continue;
//         if (result.length) {
//           const jlptLevel = result.flatMap(str => str.match(/\d+/));
//           const max = Math.max(...jlptLevel);
//           if (max >= 3) {
//             returnedJLPTValue.push(" is of JLPT level N3 or above.");
//           } else returnedJLPTValue.push(" is of JLPT level N1 or N2.");
//         } else returnedJLPTValue.push(" has no JLPT value.");
//       }
//     })
//
//   console.log("Array returned: " + returnedJLPTValue)
//
//
// }
