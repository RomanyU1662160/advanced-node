const fizzBuzz = (input) => {
  if (!input) throw new Error("input cannot be empty...");
  if (input < 0) throw new Error("Number must be bigger than Zero...");
  if (typeof input !== "number") throw new Error("Input must be a number ...");
  if (input % 3 === 0 && input % 5 === 0) return "FuzzBuzz";
  if (input % 3 === 0) return "Fuzz";
  if (input % 5 === 0) return "Buzz";
  return input;
};

module.exports = fizzBuzz;
