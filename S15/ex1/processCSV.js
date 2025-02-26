import fs from 'fs';
import readline from 'readline';

// specify the path of the CSV file
const path = "users.csv";

// Create a read stream
const readStream = fs.createReadStream(path);

// Create a readline interface
const readInterface = readline.createInterface({
  input: readStream
});

// Initialize an array to store the parsed data
let lineCount = 0;

// Event handler for reading lines
readInterface.on("line", () => {
  lineCount++;
});

// Event handler for the end of file
readInterface.on("close", () => {
  console.log(`Número total de linhas: ${lineCount}`);

  const result = { count: lineCount };
  const jsonOutput = JSON.stringify(result, null, 2);

  fs.writeFileSync('count.json', jsonOutput);
});



// Event handler for handling errors
readInterface.on("error", (err) => {
  console.error("Error reading the CSV file:", err);
});