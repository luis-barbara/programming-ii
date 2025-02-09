const nested = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5],
};

const flattenObj = (nested, parentKey = '') => {
    let result = {};

    for (const key in nested) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof nested[key] === 'object' && nested[key] !== null) {
            if (Array.isArray(nested[key])) {
                nested[key].forEach((item, index) => {
                    result[`${newKey}.${index}`] = item;
                });
            } else {
                Object.assign(result, flattenObj(nested[key], newKey));
            }
        } else {
            result[newKey] = nested[key];
        }
    }

    return result;
};



const flatObject = flattenObj(nested);

// Usando JSON.stringify para formatar o objeto
let jsonString = JSON.stringify(flatObject, null, 2);

// Substituindo aspas duplas por aspas simples nas chaves
jsonString = jsonString.replace(/"([^"]+)":/g, "'$1':");

console.log(jsonString);