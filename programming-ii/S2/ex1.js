console.time("bigo");
const n = 100;
for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
   console.log(i + j);
  }
}
console.timeEnd("bigo");



