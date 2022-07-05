const printCatUrl = require("../../startup/printCat");
const getCats = require("../../startup/callApi");

describe("test  PrintCatUrl", () => {
  it("return cat url ", async () => {
    return printCatUrl().then((data) => {
      expect(data).toMatch(/cdn2.thecatapi.com/);
    });
  });
});
