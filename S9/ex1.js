console.time("debug");

const fs = require('fs');  

function countWords(filename) {  
  const data = fs.readFileSync("poem.txt", "utf-8");  
  words = data.replace(/[^\w\s]/g, ''); 
  words = words.split(' ');
  console.log(words);
  return words.length;  
}  

export default add;
function add() {
    return true
}

console.log(countWords('poem.txt'));
console.timeEnd("debug");