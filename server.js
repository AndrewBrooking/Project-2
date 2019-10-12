require("dotenv").config();

// Dependencies
const express = require("express");
const exSession = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(exSession);
const expressLayouts = require("express-ejs-layouts");
// Sequelize models
const db = require("./models");
const stripe = require("stripe")("sk_test_n6VUCo5Q7AtAwqz3UOMvtvpo00eHp0lqXf");
// Intialize express app
const app = express();

// Define session and redis constants
const PORT = process.env.PORT || 3000;
const SESS_NAME = "sid";
const SESS_SECRET = "pmp-secret-donotreveal_2019-10";
const SESS_LIFE = 1000 * 60 * 60;
<<<<<<< HEAD
const REDIS_HOST = "localhost"; // url.parse(process.env.REDIS_URL).hostname ||
const REDIS_PORT = 6379; // Number(url.parse(process.env.REDIS_URL).port)
=======
// const REDIS_HOST = "localhost";
// const REDIS_PORT = 6379;
>>>>>>> b21b67b7f5f3b751e5ec31c0e6f46360c4429526

// Create redis client
const client = redis.createClient(process.env.REDIS_URL);

// Middleware
<<<<<<< HEAD
app.use(
  exSession({
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
  })
);
=======
app.use(exSession({
  name: SESS_NAME,
  secret: SESS_SECRET,
  store: new redisStore({
    // host: REDIS_HOST,
    // port: REDIS_PORT,
    client: client
  }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: SESS_LIFE,
    sameSite: true
  }
}));
>>>>>>> b21b67b7f5f3b751e5ec31c0e6f46360c4429526

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
require("./routes/stripeRoutes.js")(app, db, stripe);

const syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true clearing the `pmp_db`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models
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
