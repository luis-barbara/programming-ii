/*
1. Calculadora de Descontos em Compras
Descrição: Se a compra tem descontos aplicáveis de forma acumulativa, 
a recursividade pode ser usada para aplicar descontos até que um limite 
máximo de desconto seja alcançado.
Aplicação Real: Plataformas de e-commerce ou sistemas de pontos de fidelidade.*/



const LIMITE_DESCONTO = 50;  // Limite máximo ajustável


function calcDesconto(preco, desconto) {
    return preco - (preco * (desconto / 100));
}


function aplicarDesconto(preco = null, acumulado = 0) {
    if (preco === null) {
        preco = parseFloat(prompt("Qual o preço do produto?").replace(",", "."));
        if (isNaN(preco) || preco <= 0) {
            console.log("Por favor, insere um valor válido para o preço (maior que 0).");
            return aplicarDesconto();
        }
    }

    let desconto = parseFloat(prompt(`Qual o desconto em %? (Limite máximo: ${LIMITE_DESCONTO}%)`).replace(",", "."));
    if (isNaN(desconto) || desconto < 0 || desconto > LIMITE_DESCONTO) {
        console.log(`Por favor, insira um valor válido para o desconto (entre 0 e ${LIMITE_DESCONTO}%`);
        return aplicarDesconto(preco, acumulado);
    }

    // Verifica se o desconto vai ultrapassar o limite
    if (acumulado + desconto > LIMITE_DESCONTO) {
        console.log(`O limite máximo de desconto (${LIMITE_DESCONTO}%) foi atingido. Não é possível aplicar mais descontos.`);
        return;
    }

    // Aplica o desconto
    let precoComDesconto = calcDesconto(preco, desconto);
    acumulado += desconto;

    console.log(`Preço original: ${preco.toFixed(2)}€`);
    console.log(`Desconto: ${desconto}%`);
    console.log(`Preço original com Desconto: ${precoComDesconto.toFixed(2)}€`);
    console.log(`Desconto acumulado: ${acumulado}%`);

    // Se o limite foi atingido, não pergunta mais
    if (acumulado >= LIMITE_DESCONTO) {
        console.log(`O limite máximo de desconto (${LIMITE_DESCONTO}%) foi atingido.`);
        console.log("Obrigado por utilizar a calculadora de descontos!");
        return;
    }

    // Pergunta se deseja continuar se o limite não for atingido
    let continuar = prompt("Deseja aplicar outro desconto (s/n)? Digite 's' ou 'sim' para continuar, 'n' ou 'não' para sair:").trim().toLowerCase();

    if (continuar === "s" || continuar === "sim") {
        return aplicarDesconto(precoComDesconto, acumulado);
    }
    else if (continuar === "n" || continuar === "não") {
        console.log("Obrigado por utilizar a calculadora de descontos!");
        return;
    }
    else {
        console.log("Resposta inválida. Por favor, insira 's' para continuar ou 'n' para sair.");
        return aplicarDesconto(precoComDesconto, acumulado);
    }
}

aplicarDesconto()

