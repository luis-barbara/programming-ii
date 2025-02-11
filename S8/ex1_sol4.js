const items = [];
const numItems = 1000; 
const capacity = 500;

for (let i = 0; i < numItems; i++) {
    const weight = Math.random() * 50; // Random weight between 0 and 50
    const value = Math.random() * 100; // Random value between 0 and 100
    items.push({ weight: Math.floor(weight), value: Math.floor(value) });
  }
  
  const weights = items.map(item => item.weight);
  const values = items.map(item => item.value);
  const memo = new Map();
  const selectedItems = [];

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

knapsackProb(capacity, values.length - 1, values, weights, memo);


const totalValue = memo.get(`${values.length - 1}|${capacity}`);
const totalWeight = selectedItems.reduce((acc, idx) => acc + weights[idx], 0);

const selectedItemsValues = selectedItems
  .map(idx => `Item ${idx} -> ${values[idx]}`)
  .join(" + ");

console.log(`${totalValue} (${selectedItemsValues} with total weight ${totalWeight})`);