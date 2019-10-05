require("dotenv").config();

const express = require("express");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

const expressLayouts = require('express-ejs-layouts');

// Middleware
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(expressLayouts);

// Routes
require("./routes/apiRoutes.js")(app, db);
require("./routes/userRoutes.js")(app, db);
require("./routes/htmlRoutes.js")(app, db);

const syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
