/* 2.Write a function to find the maximum product of two numbers in an array. 
// Compare the complexity of a brute-force approach vs. a sorted array approach.

//Sorted aproach (O(nlogn))
console.time("sorted");
function maxProduct(arr) {
    if (arr.length < 2) return null;

    arr.sort((a, b) => b - a);

    let num1 = arr[0];
    let num2 = arr[1];

    let product = num1 * num2;

    return `Os dois maiores números são ${num1} e ${num2}. O produto deles é: ${product}`;
}


const array = [1, 2, 3, 4, 4, 8, 9];
console.log(maxProduct(array));
console.timeEnd("sorted");
*/


//Brute-force approach (O(n^2)) 
console.time("brute-force");
function maxProduct(arr) {
    if (arr.length < 2) return null;

    let maxProduct = -Infinity;
    let num1 = arr[0], num2 = arr[1];

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const product = arr[i] * arr[j];
            if (product > maxProduct) {
                maxProduct = product;
                num1 = arr[i];
                num2 = arr[j];
            }
        }
    }
    return `Os dois maiores números são ${num1} e ${num2}. O produto deles é: ${maxProduct}`;
        
}
    

const array = [1, 2, 3, 4, 4, 8, 9];
console.log(maxProduct(array));
console.timeEnd("brute-force");