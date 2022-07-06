const router = require("express").Router();
const { body } = require("express-validator");
const { getUsers } = require("../controllers/getUsers");
/* const { getLoggedUser } = require("./controllers/getLoggedUser");
const { registerUser } = require("./controllers/registerUser");
const { updateUserDiet } = require("./controllers/updateUserDiet");
const { updateUserHealth } = require("./controllers/updateUserHealth");
const { updateUserGoal } = require("./controllers/updateUserGoal");
const { getJournalEntry } = require("./controllers/getJournalEntry");
const { getMealEntry } = require("./controllers/getMealEntry");
const { getFoodDatabase } = require("./controllers/getFoodDatabse");
const { addFoodToDatabase } = require("./controllers/addFoodToDatabase");
const { addFoodToMealEntry } = require("./controllers/addFoodToMealEntry");
const { addRecipesFromAPI } = require("./controllers/addRecipesFromAPI");
const { getRecipes } = require("./controllers/getRecipes"); */

var chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../index");
const expect = chai.expect;

describe("GET /getUsers", () => {
  it("should return the list of users", (done) => {
    chai
      .request(app)
      .get("/films-list")
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal(getUsers);
        done();
      });
  });
});
