const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getMealEntry = async (req, res, next) => {
  console.log("request entry: ", req.query);
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM mealentry WHERE id_meal = ?",
      [req.query.id_meal]
    );
    res.contentType("application/json");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    next(err);
  }
};
