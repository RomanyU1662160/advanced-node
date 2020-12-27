const mongoose = require("mongoose");

let server;
let request = require("supertest");
const Film = require("../../models/film");

describe("GET/", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async () => {
    await server.close();
  });

  it("returns film By Id ", async () => {
    let films = await request(server).get("/api/films");
    const film = new Film({
      year: 1990,
      numberInStock: 10,
      dailyRental: 2,
      director: mongoose.Types.ObjectId,
    });
    await film.save();
    let founded = await Film.findById(newFilm.id);
    expect(founded.year).toEqual(film.year);
  });
});
