/*
class Solution {
    public:
        vector<int> twoSum(vector<int>& nums, int target) {

}
    };

--------------------------------------------------------------

//O(n2)

console.time("O(n2)");

function twoSum(nums, target) {

    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                console.log(`${nums[i]} + ${nums[j]} = ${target}`);
                return [i, j];
                }
            }
        }
    }

const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));
console.timeEnd("O(n2)");

/*-------------------------------------------------------------------

//O(n)*/


console.time("O(n)");

function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            console.log(`${complement} + ${nums[i]} = ${target}`);
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }
}


const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));
console.timeEnd("O(n)");




/*--------------------------------------------------------------------

Example 1:
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

Example 3:
Input: nums = [3, 3], target = 6
Output: [0, 1] */
