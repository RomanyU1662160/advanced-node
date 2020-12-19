const fetch = require("node-fetch");

const getCats = async () => {
  const resp = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await resp.json();
  //   console.log("data  :>> ", data);
  return data;
};

module.exports = getCats;
