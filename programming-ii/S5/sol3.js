
const users = [  
    { id: 1, name: 'Alice', city: 'Paris' },  
    { id: 2, name: 'Bob', city: 'London' },  
    { id: 3, name: 'Charlie', city: 'Paris' }  
  ];


const userMap = new Map()

users.forEach((user) => {
	const {city} = user;

	if (userMap.has(city)) {
		userMap.get(city).push(user);
       }   else {
	    userMap.set(city, [user]);
	}
});

console.log(userMap);