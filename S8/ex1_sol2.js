const items = [
    { weight: 2, value: 10 },
    { weight: 3, value: 15 },
    { weight: 5, value: 40 },
];
const capacity = 7;
const values = items.map(item => item.value);
const weights = items.map(item => item.weight);
const memo = new Map();


function knapsackProb(capacity, n, values, weights, memo) {
    if (capacity < 0) {
        return Number.MIN_SAFE_INTEGER;
      }
    if (capacity == 0 || n < 0) {
        return 0;
    }

    const key = `${n}|${capacity}`;

    if (!memo.has(key)){
        const include = values[n] + knapsackProb(capacity - weights[n], n - 1, values, weights, memo);

        const exclude = knapsackProb(capacity, n - 1, values, weights, memo);

        memo.set(key, Math.max(include, exclude));
  }

  // return setting the value to the map
  return memo.get(key);
}

console.log(knapsackProb(capacity, values.length - 1, values, weights, memo));
