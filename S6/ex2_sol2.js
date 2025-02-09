const nested = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5],
};

const flattenObj = (obj, path = '') => {
    let result = {};

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const newPath = path ? `${path}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                if (Array.isArray(obj[key])) {
                    obj[key].forEach((item, index) => {
                        result[`${newPath}.${index}`] = item;
                    });
                } else {
                    Object.assign(result, flattenObj(obj[key], newPath));
                }
            } else {
                result[newPath] = obj[key];
            }
        }
    }

    return result;
};


const flattened = flattenObj(nested);

let formattedOutput = '';
const keys = Object.keys(flattened);
keys.forEach((key, index) => {
    formattedOutput += `'${key}': ${flattened[key]}`;
    if (index < keys.length - 1) {
        formattedOutput += ',\n';  // Adiciona vírgula entre os itens, mas não no último
    } else {
        formattedOutput += '\n';  // Adiciona apenas a nova linha após o último item
    }
});

console.log(`{\n${formattedOutput}}`);