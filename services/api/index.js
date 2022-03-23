const api = require("express").Router();

api.use("/parquet", require("./parquet"));

api.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = api;
