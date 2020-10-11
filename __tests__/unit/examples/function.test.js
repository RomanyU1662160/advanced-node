const calculate = require("../../startup/calculate");

const items = ["Banana", "Apple", "Orange"];

test("should throw error if num2 less than zero  ", () => {
  expect(() => calculate(2, -4)).toThrow();
});

describe("test calculate method", () => {
  it("should return sum of numbers", () => {
    const result = calculate(5, 6);
    expect(result).toBe(30);
  });
});

describe("test items Array", () => {
  it("check item exists in the array", () => {
    expect(new Set(items)).toContain("Orange");
    expect(items).toEqual(expect.arrayContaining(["Banana", "Apple"]));
  });

  it("does not match if array not contains expected elements", () => {
    expect(items).not.toEqual(expect.arrayContaining(["Strawberry"]));
  });
});

describe("test mocking function", () => {
  it("tests mocking the calculate function", () => {
    const mockFn = jest.fn(calculate);
    const res = mockFn(5, 2);
    expect(res).toBe(10);
  });
});
