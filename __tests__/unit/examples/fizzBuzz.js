const fizzBuzz = (input) => {
  if (!input) throw new Error("input cannot be empty...");
  if (input < 0) throw new Error("Number must be bigger than Zero...");
  if (typeof input !== "number") throw new Error("Input must be a number ...");
  if (input % 3 === 0 && input % 5 === 0) return "FuzzBuzz";
  if (input % 3 === 0) return "Fuzz";
  if (input % 5 === 0) return "Buzz";
  return input;
};

module.exports = fizzBuzz;

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
