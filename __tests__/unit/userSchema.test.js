const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const config = require("config");
const mongoose = require("mongoose");
let server;

const setup = function () {
  const user = new User({
    id: mongoose.Types.ObjectId,
    fname: "test",
    lname: "test",
    email: "test@email.com",
    password: "1234",
    isGold: true,
  });
  const d = Date.now();
  const setExpiryTime = async () => {
    const time = await setTimeout(() => {
      const elapsed = Date.now();
      const seconds = elapsed / 1000;
      console.log("seconds", seconds);
    }, 360000);
    return time;
  };

  const expectedResult = {
    id: user.id,
    exp: setExpiryTime()
      .then((data) => data)
      .catch((e) => console.log("e", e)),
  };

  return { user, expectedResult };
};

describe("test generateAuthToken function", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async () => {
    await server.close();
  });

  it("generate code ", () => {
    const { user, expectedResult } = setup();

    const token = user.generateAuthToken(360000);
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    expect(decoded).toMatchObject(expectedResult);
  });

  it("expires in the future  ", () => {
    const { user, expectedResult } = setup();

    const token = user.generateAuthToken(360000);
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    expect(decoded.exp).toBeGreaterThan(Date.now() / 1000);
  });
});
