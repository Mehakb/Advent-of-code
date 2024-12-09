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

  let sum = 0;
  function calc(arr) {
    const matches = arr.match(/mul\(\d+,\d+\)/gm);
    const newArr = matches.map((item) => eval(item));
    sum = newArr.reduce((a, b) => a + b, sum);
  }

  rl.on("line", (line) => {
    calc(line);
  });

  rl.on("close", () => {
    console.log(sum);
  });
}

// Call the function with a file path
readFileLineByLine("../sample.txt");
