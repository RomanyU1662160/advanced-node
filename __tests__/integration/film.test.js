const request = require("supertest");
let server;

describe("get api/films", () => {
  beforeEach(() => {
    server = require("../../server");
    // console.log(`BeforeEach Called `);
  });

  afterEach(async () => {
    await server.close();
    // console.log(`AfterEach Called `);
  });

  it("should return all films", async () => {
    const res = await request(server).get("/api/films");
    expect(res.status).toBe(200);
  });
}, 50000);
