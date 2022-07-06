const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

var server = app.listen(process.env.PORT || 8000, () =>
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  )
);
