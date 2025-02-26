function* evenNumbers(list) {
    for (let index = 0; index < list.length; index++)
        if (list[index] % 2 === 0) {
            yield list[index];
        }
    }      

let list = [1, 2, 3, 4, 5, 6, 7, 8];
let items = evenNumbers(list);

let getNext = items.next();
let count = 0;
let n = 3;

while(!getNext.done && count < n) {
    console.log(getNext.value);
    getNext = items.next();
    count++;
} 

