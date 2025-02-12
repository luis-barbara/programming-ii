const items = [  
    { weight: 2, value: 10 },  
    { weight: 3, value: 15 },  
    { weight: 5, value: 40 }  
  ];  
  const capacity = 7;  
  
  /* opção1:
  weight[0] + weight[1] = 2 + 3 = 5
  value[0] + value[1] = 10 + 15 = 25
  
  opção2:
  weight[0] + weight[2] = 2 + 5 = 7
  value[0] + value[2] = 10 + 40 = 50 */
  
  //Opção 1
  let weight1 = items[0].weight + items[1].weight;
  let value1 = items[0].value + items[1].value;
  
  //Opção 2
  let weight2 = items[0].weight+ items[2].weight;
  let value2 = items[0].value + items[2].value;
  
  
  function knapsack() {
      let result = 0;
      
      if (weight1 <= capacity) {
          result = Math.max(result, value1);
      }
      if (weight2 <= capacity) {
          result = Math.max(result, value2);
      }
      return result;
      }
    
  const result = knapsack()
  
  
  if (result === value1) {
    console.log(`${result} (Items 0 and 1 -> ${items[0].value} + ${items[1].value} = ${value1} with total weight ${weight1})`);
  } else if (result === value2) {
    console.log(`${result} (Items 0 and 2 -> ${items[0].value} + ${items[2].value} = ${value2} with total weight ${weight2})`);
  }