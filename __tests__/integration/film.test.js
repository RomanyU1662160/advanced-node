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
  it("should populate director details ", async () => {
    const director = {
      name: "Director4",
      email: "test2@test.com",
    };
    const res = await request(server).get("/api/films");
    expect(res.body[0]["director"]).toMatchObject(
      expect.objectContaining(director)
    );
    console.log("req.body ::>>>", res.body[0]);
    expect(res.body[0]).toMatchObject({ name: "Film1", director });
  });
}, 50000);
