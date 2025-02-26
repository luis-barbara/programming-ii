/**
 * Calculates the average of an array of numbers.
 *
 * @param {number[]} arr - An array of numbers for which the average is to be calculated.
 * @returns {number} The average of the numbers in the array. Returns 0 if the array is empty.
 */
export function average(arr) { 
    if (arr.length === 0) return 0; 
    const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0); 
    return sum / arr.length; 
} 
 

