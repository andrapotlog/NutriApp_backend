const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getLoggedUser = async (req, res, next) => {
  console.log("reques: ", req.query);
  try {
    const [rows] = await conn.execute(
      "SELECT a.id_user, a.email, a.first_name, a.last_name,a.gender, a.birthdate, b.height, b.weight, b.goal, b.diet, b.health, b.physical_activity, b.bmr, b.calories, b.diet_calories FROM userhistory b, users a WHERE a.id_user = b.id_user AND a.id_user = ?  ORDER BY TIMESTAMP desc",
      [req.query.uid]
    );
    res.contentType("application/json");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    next(err);
  }
};
