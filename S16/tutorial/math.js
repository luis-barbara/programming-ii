const WRONGTYPES = [
    "string",
    "function",
    "object",
    "boolean",
    "undefined",
    "null"
]


export function sum(a,b){
    return a+b;
}

export function subtract(a,b){
    if(WRONGTYPES.includes(typeof a) || WRONGTYPES.includes(typeof b))
        throw new Error("not possible");
    if(typeof a != "number");
    return a-b;
};

