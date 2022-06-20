const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.addFoodToDatabase = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.log("requestttt: ", req.body.params);
  try {
    const [rows] = await conn.execute(
      "INSERT INTO foods (id_food,name,category,measure_label,energ_kcal,protein,carbs,fats)" +
        "VALUES (?,?,?,?,?,?,?,?)",
      [
        req.body.params.id_food,
        req.body.params.name,
        req.body.params.category,
        req.body.params.measure_label,
        req.body.params.energ_kcal,
        req.body.params.protein,
        req.body.params.carbs,
        req.body.params.fats,
      ]
    );

    if (rows.affectedRows === 1) {
      console.log("SUCCESFUL");
      return res.status(201).json({
        message: "The food has been successfully inserted.",
      });
    }
    return res.send("ok!");
  } catch (err) {
    next(err);
  }
};
