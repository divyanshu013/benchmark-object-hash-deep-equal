const fs = require("fs");
const hash = require("object-hash");

const SIZE = 10;

// just some random shit
const data = Array(SIZE)
  .fill(1)
  .map((item, index) => ({
    id: String(index),
    name: "Guns N Roses",
    contact: index * index,
    birthday: 1986,
    label: "home",
    jobTitle: null,
    company: null,
    email: "div.blackcat@gmail.com",
    address: "Everywhere",
    phones: [index * 2, index * 7, index * 13]
  }));

// converts JSON array to object with key as the id
const getKeyedData = data =>
  data.reduce(
    (all, contact) => ({
      ...all,
      [contact.id]: contact
    }),
    {}
  );

fs.writeFile("full.json", JSON.stringify(data, null, 4), () => {
  console.log("Generated full-keyed json");
});

fs.writeFile(
  "full-keyed.json",
  JSON.stringify(getKeyedData(data), null, 4),
  () => {
    console.log("Generated full-keyed json");
  }
);

const hashedData = data.reduce(
  (all, item) => ({
    ...all,
    [item.id]: hash(item)
  }),
  {}
);

fs.writeFile("hash-keyed.json", JSON.stringify(hashedData, null, 4), () => {
  console.log("Generated hashed-keyed json");
});
