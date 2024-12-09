const fs = require('fs');
const readline = require('readline');

const leftArr = []
const rightArr = []


// Function to read a file line by line
function readFileLineByLine(filePath) {
   const stream = fs.createReadStream(filePath);
   const rl = readline.createInterface({
      input: stream,
      output: process.stdout,
      terminal: false
   });

   rl.on('line', (line) => {
      const str = line.replace("   ", " ").split(" ")
      leftArr.push(str[0])
      rightArr.push(str[1])
   });

   rl.on('close', () => {
      const sortedLeftArr = leftArr.sort();
      const sortedRightArr = rightArr.sort();

      const tmpArr = []
      for (i = 0; i < leftArr.length; ++i) {
         tmpArr.push(sortedLeftArr[i] * sortedRightArr.filter(item => item === sortedLeftArr[i]).length);
      }

      console.log(tmpArr.reduce((prev, current) => prev + current, 0))
   });
}

// Call the function with a file path
readFileLineByLine('../sample.txt');

