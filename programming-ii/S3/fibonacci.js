
/*F(n + 2) = F(n + 1) + F(n) 
//O(n) 

let n = prompt("Indica um numero?");

console.time("fibonacci")
function fibonacci(num) {
    let sequencia = [];
    if (num === 0) return sequencia;
    sequencia.push(0);
    if (num === 1) return sequencia[0];
    sequencia.push(1);
    for (let i = 2; i <= num; i++) {
            const proximo = sequencia[i-1] + sequencia[i-2];
            sequencia.push(proximo);
    }
    return sequencia[num];
}


console.log(fibonacci(n));
console.timeEnd("fibonacci")


Arrow function 
//O(!n) */

let number = prompt("Indica um numero?");

console.time("newFibo")
const newFibo = (number) => {
    if (number === 0) return 0;
    if (number === 1) return 1;
    return newFibo(number-2) + newFibo(number-1);
}

console.log(newFibo(number));
console.timeEnd("newFibo") 