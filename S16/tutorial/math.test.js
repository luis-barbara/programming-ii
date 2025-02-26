import test from "node:test";
import { sum, subtract } from "./math.js"

test('two plus two is four (Aritmetic version)', () => {
    expect(2 + 2).toBe(4);
  });


test('two plus two is four (Function version)', () => {
    let result = sum(2,2)
    expect(result).toBe(4);
  });



test("subtract(null,2)=Error()", ()=> {
    let a = null;
    let b = 2;
    let result = subtract(a,b);
    let expectedResult = 0;
    expect(result).toBe(expectedResult);
});


test("subtract(2, null)=Error()", ()=> {
    let a = false;
    let b = 2;
    expect(()=>subtract(a,b)).toThrow(Error);
    expect(()=>subtract(a,b)).toThrow("not possible");
});
