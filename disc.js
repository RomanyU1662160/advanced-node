const fetch = require("node-fetch");

const exec = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const cat = await res.json();
  console.log("cat ::>>>", cat);
  return cat;
};

exec().then((data) => console.log("data ::>>>", data[0].url));
let url;

const getCatUrl = async () => {
  const data = await exec();
  console.log("data ::>>>", data);
  url = data[0].url;
};

getCatUrl().then(() => console.log("url ::>>>", url));
