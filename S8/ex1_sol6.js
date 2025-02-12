const items = [  
    { weight: 2, value: 10 },  
    { weight: 3, value: 15 },  
    { weight: 5, value: 40 }  
  ];  
  const capacity = 7;
  
  function knapsack() {
    let result = 0;
    let selectedItems = [];
    let selectedWeight = 0;
    let selectedValue = 0;
  
    // Iterar sobre todas as combinações de itens
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        // Combinação de item i e item j
        let weight = items[i].weight + items[j].weight;
        let value = items[i].value + items[j].value;
        
        if (weight <= capacity) {
          if (value > result) {
            result = value;
            selectedItems = [i, j];
            selectedWeight = weight;
            selectedValue = value;
          }
        }
      }
    }
  
    // Exibir o resultado
    if (selectedItems.length > 0) {
      console.log(`${result} (Items ${selectedItems.join(' and ')} -> ${selectedItems.map(i => items[i].value).join(' + ')} = ${selectedValue} with total weight ${selectedWeight})`);
    }
    return result;
  }
  
  knapsack();