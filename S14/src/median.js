/**
 * Calculates the median of an array of numbers.
 * 
 * The array is first sorted in ascending order, and then:
 * - If the length is odd, the middle element is returned.
 * - If the length is even, the average of the two middle elements is returned.
 *
 * @param {number[]} arr - An array of numbers for which the median is to be calculated.
 * @returns {number} The median value of the numbers in the array.
 */
export function median(arr) {
    const mid = Math.floor(arr.length / 2);
    const sortedArr = arr.sort((a, b) => a - b);
  
    if (arr.length % 2 === 0) {
       return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    } else {
       return sortedArr[mid];
    }
 }
 
