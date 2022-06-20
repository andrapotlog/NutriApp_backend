const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getRecipesFromAPI = async (req, res, next) => {
  const app_id = "2ae5a608";
  const app_key = "85e321f09145712349620af49bf0fb22";

  console.log("request entry: ", req.query);
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM journal WHERE date_entry = ? and id_user = ?",
      [req.query.date, req.query.uid]
    );

    res.contentType("application/json");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    next(err);
  }
};
