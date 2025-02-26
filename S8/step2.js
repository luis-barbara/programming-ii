function coinChange(coins, target) {  
    coins.sort((a, b) => b - a); // Sort descending  
    let count = 0;  
    for (const coin of coins) {  
      while (target >= coin) {  
        target -= coin;  
        count++;  
      }  
    }  
    return target === 0 ? count : -1;  
  }  
  console.log(coinChange([1, 5, 10], 28)); // 10 + 10 + 5 + 1 + 1 + 1 → 6 coins  