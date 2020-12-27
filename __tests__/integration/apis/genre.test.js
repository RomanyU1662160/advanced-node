
const Genre = require("../../../models/genre")
let server;

describe("GET / ", () => {
    beforeEach(() => server = require("../../../server"));
    afterEach(async () => {
        // await Genre.remove();
        server.close()
        await Genre.remove();
    })
    it("return Genrre By id ", async () => {
        let newGenre = new Genre({ name: "Test" })
        const genre = await newGenre.save();
        console.log('genre', genre);
        let founded = await Genre.findById(genre.id)
        const expectedResult = {
            id: founded.id,
            "name": "Test",
        }
        expect(founded).toMatchObject(expectedResult)
    });
    it("return All Genres ", async () => {
        let mockGenres = [
            { name: "genre1" },
            { name: "genre2" },
            { name: "genre3" },
            { name: "genre4" },
        ];
        await Genre.collection.insertMany(mockGenres);
        let genres = await Genre.find();
        expect(genres.length).toEqual(4);

    })
})

