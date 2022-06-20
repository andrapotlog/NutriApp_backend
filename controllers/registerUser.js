const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.log("requestttt: ", req.body.params);
  try {
    const [rows] = await conn.execute(
      "INSERT INTO users (id_user, email,first_name,last_name,created_at,gender,birthdate,height,weight,goal,diet,health,physical_activity, bmr, calories, diet_calories)" +
        "VALUES (?,?, ?, ?, NOW(), ?, ?, ?,?,?, 'empty', 'empty', ?, ?,?,?)",
      [
        req.body.params.id_user,
        req.body.params.email,
        req.body.params.first_name,
        req.body.params.last_name,
        req.body.params.gender,
        req.body.params.birthdate,
        req.body.params.height,
        req.body.params.weight,
        req.body.params.goal,
        req.body.params.physical_activity,
        req.body.params.bmr,
        req.body.params.calories,
        req.body.params.diet_calories,
      ]
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
