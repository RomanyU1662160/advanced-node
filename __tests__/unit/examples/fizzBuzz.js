const fizzBuzz = require("../../startup/fizzBuzz");

describe("test FizzBuzz", () => {
  it(" throw error when input  is falsy", () => {
    const falsies = ["", 0, false, NaN, undefined, null];
    falsies.forEach((F) => {
      expect(() => fizzBuzz(F)).toThrow();
    });
  });

  it(" throw error when input is less than Zero ", () => {
    expect(() => fizzBuzz(-9)).toThrow();
  });

  it(" throw error when input is not a number", () => {
    expect(() => fizzBuzz("String")).toThrow();
  });

  it(" returns FizzBuzz when number is divisible by 3 and 5  ", () => {
    expect(fizzBuzz(15)).toEqual("FuzzBuzz");
  });

  it(" returns Fuzz when number is divisible by 3 only", () => {
    expect(fizzBuzz(9)).toEqual("Fuzz");
  });

  it(" returns Buzz when number is divisible by 5 only", () => {
    expect(fizzBuzz(20)).toEqual("Buzz");
  });

  it(" returns input when number is not divisible by 3 or 5", () => {
    expect(fizzBuzz(52)).toEqual(52);
  });
});
