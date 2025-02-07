
const users = [  
    { id: 1, name: 'Alice', city: 'Paris' },  
    { id: 2, name: 'Bob', city: 'London' },  
    { id: 3, name: 'Charlie', city: 'Paris' }  
  ];
  
  
const groupedByCity = Object.groupBy(users, ({city}) => city);
  
const userMap = new Map(Object.entries(groupedByCity));
  
console.log(userMap);