const router = require("express").Router();
const { body } = require("express-validator");
const { getUsers } = require("./controllers/getUsers");
const { getLoggedUser } = require("./controllers/getLoggedUser");
const { registerUser } = require("./controllers/registerUser");
const { updateUserDiet } = require("./controllers/updateUserDiet");
const { updateUserHealth } = require("./controllers/updateUserHealth");
const { updateUserGoal } = require("./controllers/updateUserGoal");
const { getJournalEntry } = require("./controllers/getJournalEntry");
const { getMealEntry } = require("./controllers/getMealEntry");
const { getFoodDatabase } = require("./controllers/getFoodDatabse");
const { addFoodToDatabase } = require("./controllers/addFoodToDatabase");
const { addFoodToMealEntry } = require("./controllers/addFoodToMealEntry");
const { getRecipesFromAPI } = require("./controllers/getRecipesFromAPI");

router.post("/registerUser", registerUser);
router.post("/updateUserDiet", updateUserDiet);
router.post("/updateUserHealth", updateUserHealth);
router.post("/updateUserGoal", updateUserGoal);
router.post("/addFoodToDatabase", addFoodToDatabase);
router.post("/addFoodToMealEntry", addFoodToMealEntry);

router.get("/getUsers", getUsers);
router.get("/getUser", getLoggedUser);
router.get("/getJournalEntry", getJournalEntry);
router.get("/getMealEntry", getMealEntry);
router.get("/getFoodDatabase", getFoodDatabase);

//edamam api
router.get("/getRecipesFromAPI", getRecipesFromAPI);

module.exports = router;
