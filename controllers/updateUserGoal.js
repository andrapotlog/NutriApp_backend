const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.updateUserGoal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.log("requestttt: ", req.body.params);
  try {
    const [user] = await conn.execute(
      "SELECT height, weight,diet, health, physical_activity, bmr, calories FROM userhistory where id_user = ?  ORDER BY TIMESTAMP desc",
      [req.body.params.uid]
    );

    console.log(user[0].height);

    const [row_ins] = await conn.execute(
      "INSERT INTO userhistory (id_user, timestamp, height, weight, goal, diet, health, physical_activity, bmr, calories, diet_calories) values (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.params.uid,
        user[0].height,
        user[0].weight,
        req.body.params.goal,
        user[0].diet,
        user[0].health,
        user[0].physical_activity,
        user[0].bmr,
        user[0].calories,
        req.body.params.diet_calories,
      ]
    );

    if (row_ins.affectedRows === 1) {
      console.log("SUCCESFUL");
      return res.status(201).json({
        message: "The user has been successfully updated.",
      });
    }
    return res.send("ok!");
  } catch (err) {
    next(err);
  }
};
