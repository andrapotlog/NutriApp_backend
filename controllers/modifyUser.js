const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.modifyUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.log("requestttt: ", req.body.params);
  try {
    const [user] = await conn.execute(
      "SELECT height, weight,goal,diet, health, physical_activity, bmr, calories, diet_calories FROM userhistory where id_user = ?  ORDER BY TIMESTAMP desc",
      [req.body.params.id_user]
    );

    console.log(user[0]);

    const [rows] = await conn.execute(
      "update users set first_name = ?,last_name=?,gender=?,birthdate=? where id_user=?",
      [
        req.body.params.first_name,
        req.body.params.last_name,
        req.body.params.gender,
        req.body.params.birthdate,
        req.body.params.id_user,
      ]
    );

    const [row_ins] = await conn.execute(
      "INSERT INTO userhistory (id_user, timestamp, height, weight, goal, diet, health, physical_activity, bmr, calories, diet_calories) values (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.params.id_user,
        user[0].height,
        user[0].weight,
        user[0].goal,
        user[0].diet,
        user[0].health,
        req.body.params.physical_activity,
        user[0].bmr,
        user[0].calories,
        user[0].diet_calories,
      ]
    );

    if (rows.affectedRows === 1 /* && row_ins.affectedRows === 1 */) {
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
