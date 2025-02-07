console.time("fact");
function factorial(n) {  
    if (n === 0) return 1; // Base case  
    return n * factorial(n - 1);  
  }  
  console.log(factorial(10)); 

  console.timeEnd("fact");

