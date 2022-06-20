const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.getJournalEntry = async (req, res, next) => {
  console.log("request entry: ", req.query);
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM journal WHERE date_entry = ? and id_user = ?",
      [req.query.date, req.query.uid]
    );

    if (rows.length === 0) {
      const [insert] = await conn.execute(
        "INSERT INTO journal (`date_entry`,`id_user`)" + "VALUES (?,?)",
        [req.query.date, req.query.uid]
      );

      const [newRows] = await conn.execute(
        "SELECT * FROM journal WHERE date_entry = ? and id_user = ?",
        [req.query.date, req.query.uid]
      );

      if (insert.affectedRows === 1) {
        console.log("SUCCESFUL new day entry in journal");
      }

      res.contentType("application/json");
      return res.send(JSON.stringify(newRows));
    }
    res.contentType("application/json");
    return res.send(JSON.stringify(rows));
  } catch (err) {
    next(err);
  }
};
