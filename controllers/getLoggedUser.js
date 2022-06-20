const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getLoggedUser = async (req, res, next) => {
  console.log("reques: ", req.query);
  try {
    const [rows] = await conn.execute("SELECT * FROM users WHERE id_user = ?", [
      req.query.uid,
    ]);
    res.contentType("application/json");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    next(err);
  }
};
