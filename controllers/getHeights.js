const { response } = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getHeights = async (req, res, next) => {
  try {
    const [rows] = await conn.execute(
      "SELECT height, timestamp FROM usermeasuremets where id_user = ? and height is not null ORDER BY TIMESTAMP desc",
      [req.query.uid]
    );
    res.contentType("application/json");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    next(err);
  }
};
