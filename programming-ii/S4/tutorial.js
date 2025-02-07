// Node.js fs module

const fs = require('node:fs')

function convertCSVtoJSON() {
  try {
    // Step 1: Check if the input file exists
    if (!fs.existsSync("Session4_data.csv")) {
      console.error("Input file does not exist.");
      return;
    }

    const csvData = fs.readFileSync("Session4_data.csv", "utf-8");

    const rows = csvData.split("\n");
    const headers = rows[0].split(","); // ["name", "email", "age"]
    const data = rows.slice(1).map((row) => {
      const values = row.split(",");

      if (values.length !== 3 || isNaN(values[2])) {
        return null;
      }

      return {
        name: values[0],
        email: values[1],
        age: parseInt(values[2]),
      };
    }).filter((row) => row !== null); // Remove invalid rows

    fs.writeFileSync("session4_data.json", JSON.stringify(data, null, 2));
    console.log(csvData);

    // ... file operations ...
  } catch (error) {
    console.error("Error:", error.message);
  }
}

convertCSVtoJSON();
