const fetch = require("node-fetch");
const getCats = require("../../../startup/callApi");

const mockResponse = {
  breeds: [],
  id: "hSAMnxCFS",
  url: "https://cdn2.thecatapi.com/images/hSAMnxCFS.jpg",
  width: 622,
  height: 770,
};

describe("test Call api function", () => {
  it("fetch a random cat object", async () => {
    const data = await getCats();
    expect(data[0]).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        url: expect.any(String),
        width: expect.any(Number),
        height: expect.any(Number),
      })
    );
  });

  // another way to test async function
  it("fetch a random cat object", async () => {
    return getCats().then((data) =>
      expect(data[0]).toMatchObject(
        expect.objectContaining({
          id: expect.any(String),
          url: expect.any(String),
          width: expect.any(Number),
          height: expect.any(Number),
        })
      )
    );
  });
});
