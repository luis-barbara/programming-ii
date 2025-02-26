console.log(hoistedVar); // Output: undefined
const hoistedVar = "I'm hoisted!";

notHoistedFunc(); // Error: notHoistedFunc is not a function
const notHoistedFunc = () => console.log("I won't work");

hoistedFunc(); // Output: "I work!"
function hoistedFunc() {
  console.log("I work!");
}

// com const/let
// se trocar var por const/let da erro no console.log(hoistedVar);
// isto porque console.log esta acima da declaração
// Output undefined
// Ambas as variáveis são elevadas, mas não podem ser acedidas antes da declaração no código
// o uso de let e const ajuda a evitar bugs e comportamentos inesperados devido ao hoisting, criando um código mais seguro e previsível.
