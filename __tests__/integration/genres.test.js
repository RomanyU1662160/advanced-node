const request = require("supertest");
const Genre = require("../../models/genre");
//const nock = require("nock");
//const connectDb = require("../../config/dbConnection");
//const superagent = require("superagent");
const User = require("../../models/user");

let server;

describe("api/genres/", () => {
  beforeEach(() => {
    server = require("../../server");
  });

  afterEach(async () => {
    await server.close();
  });

  it("should return all genres", async () => {
    const expected = {
      __v: 0,
      _id: "5f21f99ea9e3ff34d4ebd808",
      name: "Genre2",
    };
    const res = await request(server).get("/api/genres/");

    expect(res.status).toBe(200);
    // expect(res.body).toHaveLength(4);
    expect(res.body).toEqual(expect.arrayContaining([expected]));
    expect(res.body.some((g) => g.name === "Genre2")).toBeTruthy();
  }, 50000);
});

describe("/genre:id", () => {
  beforeEach(() => {
    server = require("../../server");
  });

  afterEach(async () => {
    await server.close();
  });

  it("return genre when correct id passed ", async () => {
    const genres = await Genre.find();
    let id = genres[0].id;
    const res = await request(server).get(`/api/genres/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Genre1");
  });

  it("should return error 404 if invalid id ", async () => {
    const nonExist = "5f21f992a9e3ff34d4ebd820";
    const res = await request(server).get(`/api/genres/${nonExist}`);
    expect(res.status).toBe(404);
  }, 50000);
});

describe(" test post a new genre", () => {
  const mockGenre = {
    name: "test",
  };

  const token = new User().generateAuthToken();
  beforeEach(() => {
    server = require("../../server");
  });

  afterEach(async () => {
    await server.close();
  });

  // user is not authorized
  it(" return 401 when token is not in the request header", async () => {
    const res = await request(server).post("/api/genres").send(mockGenre);
    expect(res.status).toBe(401);
  });

  // validation error - name is not exist
  it(" return error 400 if name property is not exist in the body", async () => {
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({});
    expect(res.status).toBe(400);
    expect(res);
  });

  // validation error - name is less then 5

  it("return 400 error if the name property is less than  3 chars", async () => {
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "12" });

    expect(res.status).toBe(400);
  });

  // validation error - name is more  than 50
  it("return 400 error if the name length is more than 150 ", async () => {
    const longName = new Array(152).join("a"); //Dynamically create string with length more than 150
    console.log("longName ::>>>", longName.length);
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: longName });
    expect(res.status).toBe(400);
  });

  //genre is saved
  it("saves the  genre when all validation are passed", async () => {
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send(mockGenre);
    expect(res.status).toBe(200);
    const savedGenre = await Genre.findOne({ name: "test" });
    expect(savedGenre).not.toBeNull();
  });

  it("returns the  genre when all validation are passed", async () => {
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send(mockGenre);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(mockGenre);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "test");
  });
});
