const request = require("supertest");
const User = require("../../../models/user");

describe(" authMiddleware tests ", () => {
  let server;
  beforeEach(() => {
    server = require("../../../server");
  });
  afterEach(async () => {
    await server.close();
  });

  it("return 401 error when token is not provided", async () => {
    const res = await request(server).post("/api/genres/");
    expect(res.status).toBe(401);
  });

  it("return 400 error when token is not correct", async () => {
    const token = "fakeToken";
    const res = await request(server)
      .post("/api/genres/")
      .set("x-auth-token", token);
    expect(res.status).toBe(400);
  });
  it("return 200 error when token is correct", async () => {
    const token = new User().generateAuthToken();
    console.log("token in auth  ::>>>", token);
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "Fake name" });
    expect(res.status).toBe(200);
  });
}, 50000);
