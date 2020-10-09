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
});
