const { validationResult } = require("express-validator");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const conn = require("../dbConnection.js").promise();

exports.addRecipesFromAPI = async (req, res, next) => {
  const app_id = "2ae5a608";
  const app_key = "85e321f09145712349620af49bf0fb22";

  const ingr = [
    "salmon",
    "oats",
    "fruit",
    "banana",
    "kale",
    "seaweed",
    /* "garlic",
    "shellfish",
    "chicken",
    "potatoes",
    "liver",
    "sardines",
    "blueberries",
    "eggs",
    "cocoa",
    "spinach",
    "fish",
    "broccoli", */
  ];

  console.log("request for recipes", req.body.params);
  try {
    ingr.forEach((ingredient) => {
      const url =
        "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        ingredient +
        "&app_id=2ae5a608&app_key=85e321f09145712349620af49bf0fb22" +
        req.body.params.diet +
        req.body.params.health;

      axios.get(url).then((res) => {
        const recipes = res.data.hits;

        recipes.forEach(async (recipe) => {
          const [check] = await conn.execute(
            "SELECT * FROM recipes WHERE id_recipe = ? and id_user = ?",
            [recipe.recipe.uri, req.body.params.uid]
          );

          if (check.length === 0) {
            let breakfast = 0;
            let lunch = 0;
            let dinner = 0;
            let snacks = 0;

            if (recipe.recipe.mealType[0].includes("breakfast")) {
              breakfast = 1;
            }
            if (recipe.recipe.mealType[0].includes("lunch")) {
              lunch = 1;
            }
            if (recipe.recipe.mealType[0].includes("dinner")) {
              dinner = 1;
            }
            if (recipe.recipe.mealType[0].includes("snack")) {
              snacks = 1;
            }

            const [insert] = await conn.execute(
              "INSERT INTO recipes (`id_recipe`,`id_user`,`name`,`breakfast`,`lunch`,`dinner`,`snacks`,`measure_label`, " +
                "`energ_kcal`, `protein`,`fats`,`carbs`,`url_image`,`url`)" +
                "VALUES (?,?,?,?,?,?,?,'grams',?, ?,?,?,?,?)",
              [
                recipe.recipe.uri,
                req.body.params.uid,
                recipe.recipe.label,
                breakfast,
                lunch,
                dinner,
                snacks,
                (recipe.recipe.calories * 100) / recipe.recipe.totalWeight,
                (recipe.recipe.totalNutrients.PROCNT.quantity * 100) /
                  recipe.recipe.totalWeight,
                (recipe.recipe.totalNutrients.FAT.quantity * 100) /
                  recipe.recipe.totalWeight,
                (recipe.recipe.totalNutrients.CHOCDF.quantity * 100) /
                  recipe.recipe.totalWeight,
                recipe.recipe.image,
                recipe.recipe.url,
              ]
            );

            if (insert.affectedRows === 1) {
              console.log("SUCCESFUL insert");
            }
          } else {
            const [row_update] = await conn.execute(
              "UPDATE recipes SET `url_image`=? WHERE `id_user`=? and `id_recipe`=?",
              [recipe.recipe.image, req.body.params.uid, recipe.recipe.uri]
            );

            if (row_update.affectedRows === 1) {
              console.log("updated");
            }
          }
        });
      });
    });

    return res.send("ok!");
  } catch (err) {
    next(err);
  }
};
