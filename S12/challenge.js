function* range(start, end) {
    for (let i = start; i <= end; i++) {
            yield i;
        }
    }      

const start = 5;
const end = 10;

for (let num of range(start, end)) {
    console.log(num);
}

