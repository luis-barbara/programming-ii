const items = [
    { weight: 2, value: 10 },
    { weight: 3, value: 15 },
    { weight: 5, value: 40 },
];
const capacity = 7;


function knapsackProb(items, capacity) {
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight)); // Sort descending
    let totalValue = 0;
    let remainCapacity = capacity;

    for (const item of items) {
        if (remainCapacity >= item.weight) {
            remainCapacity -= item.weight;
            totalValue += item.value;
        }
        if (remainCapacity == 0) break;
    }
    return totalValue
}
console.log(knapsackProb(items, capacity));
