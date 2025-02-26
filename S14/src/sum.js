/**
 * Calculates the sum of all the numbers in an array.
 *
 * @param {number[]} arr - An array of numbers to be summed.
 * @returns {number} The sum of all the elements in the array.
 */
export function sum(arr) {
   let total = 0;
   for (let i = 0; i < arr.length; i++) {
       total += arr[i];
   }
   return total;
}


 
