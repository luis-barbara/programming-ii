function knapsackProb(items, capacity) {
    const n = items.length;
    const dp = new Array(capacity + 1).fill(0); 
  
    
    for (let i = 0; i < n; i++) {
      const { weight, value } = items[i];
  
      for (let w = capacity; w >= weight; w--) {
        dp[w] = Math.max(dp[w], dp[w - weight] + value);
      }
    }
  
    return dp[capacity];
  }
  
  // Exemplo
  const items = [
    { weight: 2, value: 10 },
    { weight: 3, value: 15 },
    { weight: 5, value: 40 },
  ];
  const capacity = 7;
  
  console.log(knapsackProb(items, capacity)); // Output: 50