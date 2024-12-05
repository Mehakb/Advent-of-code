const fs = require("fs");
const readline = require("readline");

const leftArr = [];
const rightArr = [];

// Function to read a file line by line
function readFileLineByLine(filePath) {
  const stream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: stream,
    output: process.stdout,
    terminal: false,
  });
  
  function calc(arr) {
    let asc = arr[1] > arr[0];
    let desc = arr[1] < arr[0];

    for (let i = 1; i < arr.length; i++) {
      let diff = arr[i] - arr[i - 1];
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        return false;
      }
      if (asc && diff <= 0) {
        return false
      }
      if (desc && diff >= 0) {
        return false;
      }
    }
    return true;
  }

  let count = 0;
  rl.on("line", (line) => {

    const arr = line.split(" ").map(Number);
    
    if (calc(arr)) {
      ++count;
    }

  });

  rl.on("close", () => {
    console.log(count);
  });
}

// Call the function with a file path
readFileLineByLine("./sample.txt");
