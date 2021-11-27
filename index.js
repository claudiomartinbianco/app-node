require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

let products = require("./products.json");

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const save = () => {
  fs.writeFile(
    "./products.json",
    JSON.stringify(products, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

app.get("/", (req, res) => {
  // res.json(process.env.NODE_ENV);
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const findRecord = products.find(product => product.uuid === req.params.id);
  if (!findRecord) {
    res.status(404).send("record was not found");
  } else {
    res.json(findRecord);
  }
});

app.post("/products", (req, res) => {
  products.push(req.body);
  save();
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

app.put("/products/:id", (req, res) => {
  products = products.map((product) => {
    if (product.uuid === req.params.id) {
      return req.body;
    } else {
      return product;
    }
  });
  save();

  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

app.delete("/products/:id", (req, res) => {
  products = products.filter((product) => product.uuid !== req.params.id);
  save();
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: products.length,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});