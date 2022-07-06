const router = require("express").Router();
const { body } = require("express-validator");
const { getUsers } = require("./controllers/getUsers");
const { getLoggedUser } = require("./controllers/getLoggedUser");
const { registerUser } = require("./controllers/registerUser");
const { modifyUser } = require("./controllers/modifyUser");
const { updateUserDiet } = require("./controllers/updateUserDiet");
const { updateUserHealth } = require("./controllers/updateUserHealth");
const { updateUserGoal } = require("./controllers/updateUserGoal");
const { getJournalEntry } = require("./controllers/getJournalEntry");
const { getMealEntry } = require("./controllers/getMealEntry");
const { getFoodDatabase } = require("./controllers/getFoodDatabse");
const { addFoodToDatabase } = require("./controllers/addFoodToDatabase");
const { addFoodToMealEntry } = require("./controllers/addFoodToMealEntry");
const { addRecipesFromAPI } = require("./controllers/addRecipesFromAPI");
const { getRecipes } = require("./controllers/getRecipes");
const { getWeights } = require("./controllers/getWeights");
const { getHeights } = require("./controllers/getHeights");

router.post("/registerUser", registerUser);
router.post("/modifyUser", modifyUser);
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
router.get("/getWeights", getWeights);
router.get("/getHeights", getHeights);

//edamam api
router.post("/addRecipesFromAPI", addRecipesFromAPI);
router.get("/getRecipes", getRecipes);

module.exports = router;
