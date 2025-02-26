import { sum } from "./sum.js";
import { average } from "./average.js";
import { median } from "./median.js"
import chalk from "chalk";

/**
 * Calculator class that calculates sum, average, and median of an array.
 */
class Calculator {
    constructor() {
        const arr = [1, 2, 3, 4, 5];

        this.sumResult = sum(arr);
        this.averageResult = average(arr);
        this.medianResult = median(arr);
    }

    /**
   * Calculates the total by summing the sumResult, averageResult, and medianResult.
   * 
   * @returns {number} The total of the sum, average, and median results.
   * @memberof Calculator
   */
    calculateTotal() {
        return this.sumResult + this.averageResult + this.medianResult;
    }

}

/**
 * Create a new Calculator instance, calculate the total, and log it to the console.
 */
const calc = new Calculator();
const total = calc.calculateTotal();


/**
 * Log the total result to the console with red bright coloring using Chalk.
 * 
 * @constant {number} total - The total of sum, average, and median.
 */
console.log(chalk.redBright(total));

