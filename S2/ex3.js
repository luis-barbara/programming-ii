/* 3.Solve Contains Duplicate with O(n) time and O(n) space.

console.time("O(n2)");

function contDuplicates(nums) {

    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) {
                return true;       
            }
        }
    }
    return false;
}

const nums = [2, 7, 11, 15, 15];
console.log(contDuplicates(nums));
console.timeEnd("O(n2)");


/*-------------------------------------------------------------------*/

//O(n)


console.time("O(n)");

function contDuplicates(arr) {
    const temp = new Set();

    for (let num of arr) {
        if (temp.has(num)) {
            return true;
        }
        temp.add(num);
    }
    return false;
}

const arr = [2, 7, 11, 15, 15];
console.log(contDuplicates(arr));
console.timeEnd("O(n)");

