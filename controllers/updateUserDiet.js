const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.updateUserDiet = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.log("requestttt: ", req.body.params);
  try {
    const [row_update] = await conn.execute(
      "UPDATE users SET `diet`=? WHERE `id_user`=?",
      [req.body.params.diet, req.body.params.uid]
    );

    if (row_update.affectedRows === 1) {
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
