const items = [  
    { weight: 2, value: 10 },  
    { weight: 3, value: 15 },  
    { weight: 5, value: 40 }  
  ];  
  
  const capacity = 7;  
  
  // Definir o mapa de memoização
  const memo = new Map();
  
  // Função knapsack com iteração
  function knapsack(items, capacity) {
    let result = 0;
    let bestCombination = null; // Para armazenar a combinação que resulta no maior valor
  
    // Iterar sobre todas as combinações de itens
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const weight1 = items[i].weight + items[j].weight;
        const value1 = items[i].value + items[j].value;
  
        // Criar a chave baseada em array
        const memoKey = [items[i].weight, items[i].value, items[j].weight, items[j].value];
  
        // Verificar se já temos o resultado armazenado
        if (memo.has(memoKey)) {
          result = Math.max(result, memo.get(memoKey));
        } else {
          // Calcular e armazenar o resultado
          if (weight1 <= capacity) {
            const newValue = value1;
            memo.set(memoKey, newValue);
            if (newValue > result) {
              result = newValue;
              bestCombination = [i, j]; // Armazenar os índices dos itens selecionados
            }
          }
        }
      }
    }
  
    return { result, bestCombination };
  }
  
  // Chamar a função knapsack
  const { result, bestCombination } = knapsack(items, capacity);
  
  // Exibir o resultado
  if (bestCombination) {
    const [i, j] = bestCombination;
    console.log(`${result} (Items ${i} and ${j} -> ${items[i].value} + ${items[j].value} = ${result} with total weight ${items[i].weight + items[j].weight})`);
  } else {
    console.log('No valid combination found that fits within the capacity.');
  }