Hoisting é um comportamento no JavaScript onde as declarações de variáveis e funções são "elevadas" (hoisted) para o topo do seu escopo durante a execução do código. Isso significa que você pode utilizar variáveis ou funções antes de realmente declará-las no código.

var: Hoisting da declaração, mas o valor só é atribuído quando chega a linha onde ocorre a inicialização

Neste caso a função será tratada como uma variável, e o hoisting funciona da mesma forma que para variáveis. Ou seja, apenas a declaração da variável é elevada, mas não a atribuição da função.


Ou seja a funcao "notHoistedFunc();" esta a ser chamada antes da declaração:
"var notHoistedFunc = () => console.log("I won't work");"
e portanto neste caso dara erro

--------------------

Challenge.js
- Para sair output

- Coloquei "console.log(hoistedVar);" a baixo de "const hoistedVar = "I'm hoisted!";" para poder ter o output da frase
- alterei "var" para "const"

- Alterei "var" por "const" aqui:
"const notHoistedFunc = () => console.log("I won't work");"

- e meti a funcao em baixo:
"notHoistedFunc();"
