/* Generator example
function* countToThree() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  // Custom iterable object
  const customIterable = {
    [Symbol.iterator]: function* () {
      yield "a";
      yield "b";
    },
  };
  
  // Usage:
  const generator = countToThree();
  console.log(generator.next().value); // 1
  
  for (const item of customIterable) {
    console.log(item); // "a", "b"
  }
*/



function* list(numOfItems) {
    for (let num = 0; num < numOfItems; num++) {
        yield num; // return 
    }
    console.log("finished");
}

let totalItems = 10;
let items = list(totalItems);

let getNext = true;
while(getNext) {
    let nextItem = items.next();
    console.log(nextItem.value);
    getNext = !nextItem.done;
} 

console.log("All items processed");