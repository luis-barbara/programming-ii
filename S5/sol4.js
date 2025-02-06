const users = [
  { id: 1, name: 'Alice', city: 'Paris' },
  { id: 2, name: 'Bob', city: 'London' },
  { id: 3, name: 'Charlie', city: 'Paris' }
];

// Usando um objeto para agrupar
let groupedByCity = {};

for (let i = 0; i < users.length; i++) {
  let city = users[i].city;

  // Verifica se já existe uma chave para a cidade
  if (!groupedByCity[city]) {
    groupedByCity[city] = []; // Se não existir, cria um novo array para a cidade
  }

  // Adiciona o user à lista da cidade
  groupedByCity[city].push(users[i]);
}

console.log(groupedByCity);