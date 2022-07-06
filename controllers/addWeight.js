const { response } = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.addWeight = async (req, res, next) => {
  try {
    const [rows] = await conn.execute(
      "insert into usermeasuremets (id_user, timestamp, weight) values (?, now(),?)",
      [req.body.params.uid, req.body.params.weight]
    );

    if (rows.affectedRows === 1) {
      console.log("SUCCESFUL");
      return res.status(201).json({
        message: "The user has been successfully inserted.",
      });
    }
    return res.send("ok!");
  } catch (err) {
    next(err);
  }
};
