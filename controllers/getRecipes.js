const { response } = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getRecipes = async (req, res, next) => {
  console.log("get request recipes: ", req.query);
  try {
    if (req.query.meal === "breakfast") {
      const [rows] = await conn.execute(
        "SELECT * FROM recipes where id_user=? and breakfast = 1",
        [req.query.uid]
      );
      res.contentType("application/json");
      return res.send(JSON.stringify(rows));
    } else if (req.query.meal === "lunch") {
      const [rows] = await conn.execute(
        "SELECT * FROM recipes where id_user=? and lunch = 1",
        [req.query.uid]
      );
      res.contentType("application/json");
      return res.send(JSON.stringify(rows));
    } else if (req.query.meal === "dinner") {
      const [rows] = await conn.execute(
        "SELECT * FROM recipes where id_user=? and dinner = 1",
        [req.query.uid]
      );
      res.contentType("application/json");
      return res.send(JSON.stringify(rows));
    } else {
      const [rows] = await conn.execute(
        "SELECT * FROM recipes where id_user=? and snacks = 1",
        [req.query.uid]
      );
      res.contentType("application/json");
      return res.send(JSON.stringify(rows));
    }
  } catch (err) {
    next(err);
  }
};
