const registerUser = (user) => {
  if (!user) {
    throw new Error();
  }
  return { id: 4, name: "user4", email: "test@test.com" };
};

describe(" test exceptions", () => {
  it("throw error exception when name is not provided", () => {
    const falsies = [null, NaN, "", 0, undefined, false];
    falsies.forEach((a) => {
      expect(() => {
        registerUser(a);
      }).toThrow();
    });
  });

  it("returns a user object", () => {
    let res = registerUser("user4");
    expect(res).toMatchObject({ id: 4, name: "user4" });
  });
});
