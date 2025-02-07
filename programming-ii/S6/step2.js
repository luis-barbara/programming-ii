console.time("fibo");
const memo = new Map();  
function fib(n) {  
  if (n <= 1) return n;  
  if (memo.has(n)) return memo.get(n);  
  const result = fib(n - 1) + fib(n - 2);  
  memo.set(n, result);  
  return result;  
}
console.time("fibo1");  
console.log(fib(200));
console.timeEnd("fibo1");
console.time("fibo2");  
console.log(fib(400));
console.timeEnd("fibo2");
console.timeEnd("fibo");