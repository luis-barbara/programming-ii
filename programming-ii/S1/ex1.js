function findDuplicates(arr) {
    let temp = [];

    for (let i = 0; i < arr.length -1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                if (!temp.includes(arr[i])) {
                    temp.push(arr[i]);
                }
                break;
            }
        }   
    }
    return temp; 
}

const arr = [1, 2, 3, 2, 3, 5, 8];
const duplicates = findDuplicates(arr);
for (let i = 0; i < duplicates.length; i++) {
    console.log(duplicates[i] + " ");
}
