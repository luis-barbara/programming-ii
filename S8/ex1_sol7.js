const items = [  
    { weight: 2, value: 10 },  
    { weight: 3, value: 15 },  
    { weight: 5, value: 40 }  
  ];  
  
  const capacity = 7;  
  
  // Definir o mapa de memoização
  const memo = new Map();
  
  function knapsack(weight1, value1, weight2, value2) {
    let result = 0;
  
    // Criar uma chave baseada em array
    const memoKey = [weight1, value1, weight2, value2];
  
    // Verificar se já temos o resultado armazenado
    if (memo.has(memoKey)) {
      return memo.get(memoKey); // Retornar o resultado memorizado
    }
  
    // Comparar as opções
    if (weight1 <= capacity) {
      result = Math.max(result, value1);
    }
    if (weight2 <= capacity) {
      result = Math.max(result, value2);
    }
  
    // Armazenar o resultado no mapa de memoização
    memo.set(memoKey, result);
  
    return result;
  }
  
  // Opção 1: Itens 0 e 1
  let weight1 = items[0].weight + items[1].weight;
  let value1 = items[0].value + items[1].value;
  
  // Opção 2: Itens 0 e 2
  let weight2 = items[0].weight + items[2].weight;
  let value2 = items[0].value + items[2].value;
  
  // Chamar a função knapsack
  const result = knapsack(weight1, value1, weight2, value2);
  
  // Exibir o resultado
  if (result === value1) {
    console.log(`${result} (Items 0 and 1 -> ${items[0].value} + ${items[1].value} = ${value1} with total weight ${weight1})`);
  } else if (result === value2) {
    console.log(`${result} (Items 0 and 2 -> ${items[0].value} + ${items[2].value} = ${value2} with total weight ${weight2})`);
  }
