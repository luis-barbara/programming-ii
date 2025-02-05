// Node.js fs module


const fs = require('fs');

try {
const csvData = fs.readFileSync('Session4_data.csv', 'utf-8');


const rows = csvData.split('\n');
const headers = rows[0].split(','); // ["name", "email", "age"]
const data = rows.slice(1).map(row => {
  const values = row.split(',');
  return {
    name: values[0],
    email: values[1],
    age: parseInt(values[2])
  };
})

.filter(row => !isNaN(row.age));

fs.writeFileSync('session4_data.json', JSON.stringify(data, null, 2));

console.log(csvData);


    // ... file operations ...
} catch (error) {
    console.error('Error:', error.message);
}