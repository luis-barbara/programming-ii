
const users = [  
    { id: 1, name: 'Alice', city: 'Paris' },  
    { id: 2, name: 'Bob', city: 'London' },  
    { id: 3, name: 'Charlie', city: 'Paris' }  
  ];
  

const userMap = new Map();

users.forEach(user => {
    if (!userMap.has(user.city)) {
        userMap.set(user.city, []);
    }
    userMap.get(user.city).push(user)
});
    
console.log(userMap);


