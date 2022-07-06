const { response } = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getWeights = async (req, res, next) => {
  try {
    const [rows] = await conn.execute(
      "SELECT weight, timestamp FROM usermeasuremets where id_user = ? and weight is not null ORDER BY TIMESTAMP desc",
      [req.query.uid]
    );
    res.contentType("application/json");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    next(err);
  }
};
