# Calculator for Sum, Average, and Median

This is a simple JavaScript project that calculates the sum, average, and median of an array of numbers. The project contains a `Calculator` class that uses three helper functions (`sum`, `average`, and `median`) to perform these calculations.

## Features

- **Sum**: Calculates the sum of all elements in an array.
- **Average**: Computes the average (mean) of the numbers in an array.
- **Median**: Finds the median of an array of numbers (the middle value when sorted).

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) - This project is built with JavaScript and runs on Node.js.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/calculator.git
```

2. Navigate to the project directory:

```bash
cd calculator
```

3. Install the required dependencies:

```bash
npm install
```

Make sure you have the necessary files:

- **sum.js**: Contains the function to calculate the sum of an array.
- **average.js**: Contains the function to calculate the average.
- **median.js**: Contains the function to calculate the median.
- **calculator.js**: The main Calculator class that utilizes the helper functions.

## Usage

After the setup, you can run the `calculator.js` to see the results.

Create a JavaScript file to use the Calculator class:

```javascript
import { Calculator } from "./calculator.js";

const calc = new Calculator();
const total = calc.calculateTotal();

console.log("Total of sum, average, and median: ", total);
```

Run the file:

```bash
node yourfile.js
```

The result will be printed in the console, displaying the sum, average, and median calculations combined.

### Example

Given the array `[1, 2, 3, 4, 5]`:

- Sum: 15
- Average: 3
- Median: 3

The total result (sum + average + median) would be:

```bash
15 + 3 + 3 = 21
```

The result will be displayed in red using the `chalk` package.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
