module.exports = function (app, db) {
  const Op = db.Sequelize.Op

  // Load index page
  app.get("/", function (req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    }
    db.Project.findAll({}).then(function (result) {
        console.log(req.session.userID)
      res.render("index", {
        msg: result,
        authenticated: authenticated,
        loggedIn: authenticated   
      });
    });
  });

  // Load example page and pass in an example by id
  app.get('/notloggedin', function(req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    }
    res.render('notloggedin', {
      loggedIn: authenticated
    })
  })

  app.get('/create', function (req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    };
    res.render('createProject', {
      loggedIn: authenticated,
      userID: req.session.userID
    })
  });

  app.get('/welcome', function (req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    };
    res.render('welcome', {
      loggedIn: authenticated
    })
  });

  app.get('/login', function (req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    };
    res.render('login', {
      loggedIn: authenticated // == authenticated == logic for true or false
    })
  });

  app.get('/project/:id', function (req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    };
    db.Project.findOne({
      where: {
        id: req.params.id
      },
      include: db.User
    }).then(function (result) {
      res.render("project", {
        msg: result,
        loggedIn: authenticated // == authenticated == logic for true or false
      })
    });
  });

  app.get('/following', function (req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    };
    db.Following.findAll({
      where: {
        UserId: req.session.userID
      },
      include: db.User,
      include: db.Project
    })
    // logic = select * from Users u INNER JOIN Followings f on u.id = f.UserId INNER JOIN Projects p on f.Projectid = p.id;
    .then(function (result) {
      res.render('following', {
        msg: result,
        loggedIn: authenticated
      });
    });
  });
  
  app.get("/register", function (req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    };
    return res.render("registration", {
      loggedIn: authenticated
    });
  });

  app.get("/search", function (req, res) {
    let authenticated = false;
    if (req.session.userID) {
      authenticated = true;
    };
    db.Project.findAll({
      where: {
        [Op.or]: [{
          desc: {
            [Op.like]: `%${req.query.query}%`
          }
        },
        {
          name: {
            [Op.like]: `%${req.query.query}%`
          }
        }
        ]
      }
    }).then((result) => {
      res.render("index", {
        msg: result,
        loggedIn: authenticated //logic for true or false
      });
    })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    
    res.send("404");
  });
};