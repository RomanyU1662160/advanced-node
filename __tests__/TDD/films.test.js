const mongoose = require('mongoose');
const request = require('supertest');
let server;
let Film = require('../../models/film');
const User = require('../../models/user');

describe(" TEST films API ", () => {
    let genreId = mongoose.Types.ObjectID;
    let mockGenre = {
        _id: genreId,
        name: "GenreTest"
    };
    let newFilm = new Film({
        name: "test",
        year: 1990,
        numberInStock: 3,
        dailyRental: 2,
        // director: mongoose.Types.ObjectID(),
        genre: mockGenre
    })

    beforeEach(() => {
        server = require("../../server")
    })
    afterEach(async () => {
        await server.close();
    })

    it(" return film By Id ", async () => {

        await newFilm.save();



        let founded = await Film.findById(newFilm._id);

        expect(founded).not.toBeNull();
        expect(founded.name).toEqual(newFilm.name);
    });

    it("should return 401 if user is not autohrised ", async () => {
        let result = await request(server).post("/api/films").send(newFilm);
        expect(result.status).toBe(401)
    })


})