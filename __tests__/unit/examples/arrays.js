const fruits = ["banana", "apple", "orange"];

describe("Test array ", () => {
  it.only("check if item is exist in array ", () => {
    const item = "orange";
    expect(fruits).toEqual(expect.arrayContaining([item]));
  });
});
