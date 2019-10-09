require("dotenv").config();

// Dependencies
const url = require("url");
const express = require("express");
const exSession = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(exSession);
const expressLayouts = require("express-ejs-layouts");
const url = require('url')
// Sequelize models
const db = require("./models");

// Intialize express app
const app = express();

// Define session and redis constants
const PORT = process.env.PORT || 4000;
const SESS_NAME = "sid";
const SESS_SECRET = "pmp-secret-donotreveal";
const SESS_LIFE = 1000 * 60 * 60;
<<<<<<< HEAD
const REDIS_HOST = /*url.parse(process.env.REDIS_URL).hostname ||*/ "localhost";
const REDIS_PORT = /*Number(url.parse(process.env.REDIS_URL).port) || */6379;
=======
const REDIS_HOST = "localhost"; // url.parse(process.env.REDIS_URL).hostname || 
const REDIS_PORT = 6379; // Number(url.parse(process.env.REDIS_URL).port) 
>>>>>>> cf4a04e836503316a5232aa17de139f2a710cdd3

// Create redis client
const client = redis.createClient();

// Middleware
app.use(exSession({
  name: SESS_NAME,
  secret: SESS_SECRET,
  store: new redisStore({
    host: REDIS_HOST,
    port: REDIS_PORT,
    client: client
  }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: SESS_LIFE,
    sameSite: true
  }
}));

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

// If running a test, set syncOptions.force to true clearing the `pmp_db`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models
db.sequelize.sync(syncOptions).then(function () {
  app.listen(4000, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;