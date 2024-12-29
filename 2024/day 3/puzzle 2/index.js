const fs = require("fs");
const readline = require("readline");

// Function to read a file line by line
function readFileLineByLine(filePath) {
  const stream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: stream,
    output: process.stdout,
    terminal: false,
  });

  function mul(a, b) {
    return a * b;
  }

  function calc(arr) {
    const matches = arr.match(/mul\(\d+,\d+\)/gm);
    const newArr = matches.map((item) => eval(item));
    return newArr.reduce((a, b) => a + b, 0);
  }

  let sumDont = 0;

  function calcDont(arr) {
    const dontMatches = [...arr.matchAll(/don\'t\(\)/gm)]; // Spread to convert to an array
    const dontIndices = dontMatches.map((match) => match.index);
    const doMatches = [...arr.matchAll(/do\(\)/gm)]; // Spread to convert to an array
    const doIndices = doMatches.map((match) => match.index);

    // has dont's
    if (dontIndices.length > 0) {
      let lastValue = dontIndices[0];
      const totalMatches = [...arr.matchAll(/mul\(\d+,\d+\)/gm)].map(
        (match) => match.index
      );
      console.log("🚀 ~ calcDont ~ totalMatches:", totalMatches.length);
      let total = calc(arr);
      console.log("🚀 ~ calcDont ~ total:", total);
      let dontMulIndices = [];
      for (i = 0; i < dontIndices.length; ++i) {
        if (dontIndices[i] >= lastValue) {
          // dont's and do's mix
          for (j = 0; j < doIndices.length; ++j) {
            // dont's index less than do's index
            if (dontIndices[i] < doIndices[j] && dontIndices[i] >= lastValue) {
              const subArr = arr.substring(dontIndices[i], doIndices[j]);
              const mulIndices = [...subArr.matchAll(/mul\(\d+,\d+\)/gm)].map(
                (match) => +dontIndices[i] + +match.index
              );
              dontMulIndices = [...dontMulIndices, ...mulIndices];
              lastValue = doIndices[j];
            }
          }
          // dont's do not receive do's at the end
          if (dontIndices[i] > lastValue) {
            const subArr = arr.substring(dontIndices[i], arr.length);
            const mulIndices = [...subArr.matchAll(/mul\(\d+,\d+\)/gm)].map(
              (match) => +dontIndices[i] + +match.index
            );
            dontMulIndices = [...dontMulIndices, ...mulIndices];
            lastValue = arr.length;
          }
        }
      }
      const indices = totalMatches.filter(
        (item) => !dontMulIndices.includes(item)
      );
      console.log("🚀 ~ calcDont ~ indices:", indices.length)
      let x = 0
      for (i = 0; i < indices.length; ++i) {
        sumDont += calc(arr.substring(indices[i], indices[i] + 12));
        x += calc(arr.substring(indices[i], indices[i] + 12));
      }
      console.log("🚀 ~ calcDont ~ sumDont:", sumDont)
      console.log("🚀 ~ calcDont ~ x:", x)
    }
  }

  rl.on("line", (line) => {
    calcDont(line);
  });

  rl.on("close", () => {
    console.log(sumDont);
  });
}

// Call the function with a file path
readFileLineByLine("../sample.txt");
