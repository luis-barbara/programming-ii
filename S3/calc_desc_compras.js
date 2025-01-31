/*
1. Calculadora de Descontos em Compras
Descrição: Se a compra tem descontos aplicáveis de forma acumulativa, 
a recursividade pode ser usada para aplicar descontos até que um limite 
máximo de desconto seja alcançado.
Aplicação Real: Plataformas de e-commerce ou sistemas de pontos de fidelidade.*/


function calcDesconto(preco, desconto) {
    return preco - (preco * (desconto / 100));
}

function aplicarDesconto() {
    let precoOriginal = parseFloat(prompt("Qual o preço do produto?"));
        if (isNaN(precoOriginal) || precoOriginal <= 0) {
            console.log("Por favor, insere um valor válido para o preço.");
        }

    let desconto = parseFloat(prompt("Qual o desconto em %?"));
        if (isNaN(desconto) || desconto < 0 || desconto > 100) {
            console.log("Por favor, insere um vlor válido para o desconto.");
        }
    
    let precoComDesconto = calcDesconto(precoOriginal, desconto)
        console.log(`Preço original: ${precoOriginal}`)
        console.log(`Desconto: ${desconto}`)
        console.log(`Preço original Desconto: ${precoComDesconto}`)  
        
    
    let continuar = prompt("Deseja continuar? (s/n)")
    if (continuar == "s") {
        aplicarDesconto();
    }
        else {
            console.log("Obrigado por utilizar a calculadora de descontos!")
        }

}

aplicarDesconto()