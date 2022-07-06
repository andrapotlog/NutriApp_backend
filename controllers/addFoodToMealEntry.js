const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.addFoodToMealEntry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.log("requestttt: ", req.body.params);
  try {
    if (req.body.params.id_meal === 0) {
      const [rows] = await conn.execute(
        "INSERT INTO mealentry (`id_food`,`portion`)" + "VALUES (?,?)",
        [req.body.params.id_food, req.body.params.portion]
      );

      if (rows.affectedRows === 1) {
        console.log("SUCCESFUL added to mealentry");
      }

      if (req.body.params.meal === "breakfast") {
        console.log("breakfast");
        const [newRows] = await conn.execute(
          "UPDATE journal SET `breaskfast_entry`=? WHERE `date_entry`=? and `id_user`=?",
          [rows.insertId, req.body.params.date_entry, req.body.params.id_user]
        );

        if (newRows.affectedRows === 1) {
          console.log("SUCCESFUL");
          return res.status(201).json({
            message: "The food has been successfully inserted at current entry",
          });
        }
      } else if (req.body.params.meal === "lunch") {
        console.log("lunch");
        const [newRows] = await conn.execute(
          "UPDATE journal SET `lunch_entry`=? WHERE `date_entry`=? and `id_user`=?",
          [rows.insertId, req.body.params.date_entry, req.body.params.id_user]
        );

        if (newRows.affectedRows === 1) {
          console.log("SUCCESFUL");
          return res.status(201).json({
            message: "The food has been successfully inserted at current entry",
          });
        }
      } else if (req.body.params.meal === "dinner") {
        console.log("dinner");
        const [newRows] = await conn.execute(
          "UPDATE journal SET `dinner_entry`=? WHERE `date_entry`=? and `id_user`=?",
          [rows.insertId, req.body.params.date_entry, req.body.params.id_user]
        );

        if (newRows.affectedRows === 1) {
          console.log("SUCCESFUL");
          return res.status(201).json({
            message: "The food has been successfully inserted at current entry",
          });
        }
      } else {
        console.log("snack");
        const [newRows] = await conn.execute(
          "UPDATE journal SET `snack_entry`=? WHERE `date_entry`=? and `id_user`=?",
          [rows.insertId, req.body.params.date_entry, req.body.params.id_user]
        );

        if (newRows.affectedRows === 1) {
          console.log("SUCCESFUL");
          return res.status(201).json({
            message: "The food has been successfully inserted at current entry",
          });
        }
      }
    } else {
      const [rows] = await conn.execute(
        "INSERT INTO mealentry (`id_meal`,`id_food`,`portion`)" +
          "VALUES (?,?,?)",
        [
          req.body.params.id_meal,
          req.body.params.id_food,
          req.body.params.portion,
        ]
      );

      if (rows.affectedRows === 1) {
        console.log("SUCCESFUL");
        return res.status(201).json({
          message: "The food has been successfully inserted.",
          rowID: rows.insertId,
        });
      }
    }
    return res.send("ok!");
  } catch (err) {
    next(err);
  }
};
