const nested = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5],
};

const flattenObj = (nested, prefix = '') => {
    let result = {};

    for (const key in nested) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof nested[key] === 'object' && !Array.isArray(nested[key])) {
            const temp = flattenObj(nested[key], newKey);
            result = { ...result, ...temp };
        } else if (Array.isArray(nested[key])) {
            nested[key].forEach((item, index) => {
                result[`${newKey}.${index}`] = item;
            });
        } else {
            result[newKey] = nested[key];
        }
    }

    return result;
};

const flattened = flattenObj(nested);

// Format the output to have each key-value pair on a new line
const formattedOutput = Object.entries(flattened)
    .map(([key, value]) => `'${key}': ${value}`)
    .join(',\n');

console.log(`{\n${formattedOutput}\n}`);