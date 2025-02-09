const nested = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5],
};


const flattenObj = (nested) => {
    let result = {};

    for (const i in nested) {
        if (nested[i] && typeof nested[i] === 'object') {
            if (Array.isArray(nested[i])) {
                nested[i].forEach((item, index) => {
                    result[`${i}.${index}`] = item;
                });
            } else {
                const temp = flattenObj(nested[i]);
                for (const j in temp) {
                    result[`${i}.${j}`] = temp[j];
                }
            }
        } else {
            result[i] = nested[i];
        }
    }
    return result;
};

const flatObject = flattenObj(nested);
const keys = Object.keys(flatObject); // Obtém todas as chaves

console.log("{");
keys.forEach((key, index) => {
    const isLast = index === keys.length - 1; // Verifica se é o último elemento
    console.log(`  '${key}': ${flatObject[key]}${isLast ? "" : ","}`);
});
console.log("}");