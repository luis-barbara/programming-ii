function createFib() {  
    const memo = new Map();  
    return function fib(n) {  
      if (n <= 1) return n;  
      if (memo.has(n)) return memo.get(n);  
      const result = fib(n - 1) + fib(n - 2);  
      memo.set(n, result);  
      return result;  
    };  
  }  
  const fibMemo = createFib();  
  console.log(fibMemo(50)); // 12586269025 (efficient!)  