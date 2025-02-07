const nested = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5],
};

const flattenObj(obj) {
    let result = {};

    function recurse(currObj, parentKey = '') {
        for (let key in currObj) {
            if (currObj.hasOwnProperty(key)) {
                const 
            }
        }
    }





};

console.log(flattenObj(nested));
