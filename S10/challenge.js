const hoistedVar = "I'm hoisted!";
console.log(hoistedVar); 

const notHoistedFunc = () => console.log("I won't work");

hoistedFunc(); // Output: "I work!"
function hoistedFunc() {
  console.log("I work!");
}

notHoistedFunc();

