const getUserById = (id) => {
  return {
    id,
    name: "test",
    email: "test@mail.com",
  };
};

describe("test User", () => {
  it("should return the user with matched id ", () => {
    const user = getUserById(1);
    const mockUser = {
      id: 1,
      name: "test",
    };
    //expect(user).toEqual({ id: 1, name: "user1" });
    //expect(user).toEqual(mockUser);
    expect(user).toMatchObject(mockUser);
    expect(user).toHaveProperty("id", 1);
  });
});
