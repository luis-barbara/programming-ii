console.time("fibonnaci");
function fibonnaci(n) {
    const memo = new Map()
    function fib(n) {
        if (n <= 0) return console.log("error");
        if (n <= 1) return n;  
        if (memo.has(n)) return memo.get(n);  
        const result = fib(n - 1) + fib(n - 2);  
        memo.set(n, result);  
        return result; 
}  
    return fib(n);
}
console.log(fibonnaci(50)); 
console.timeEnd("fibonnaci");






