const { getUserById, users } = require("../../startup/user");

describe("test User", () => {
  it("should return the user with matched id ", () => {
    const user = getUserById(1);
    const mockUser = {
      id: 1,
      name: "user1",
    };
    //expect(user).toEqual({ id: 1, name: "user1" });
    expect(user).toMatchObject(mockUser);
    expect(user).toHaveProperty("id", 1);
  });
});
