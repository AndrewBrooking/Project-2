module.exports = function(app, db) {
  const Op = db.Sequelize.Op
  // Load index page
  app.get("/", function(req, res) {
    db.Project.findAll({}).then(function(dbExamples) {
      console.log(JSON.stringify({ msg: dbExamples }))
      res.render("index", { msg: dbExamples });
    });
  });

  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      console.log(dbExample);
      res.render("userPage", {
        id: req.params.id,
        name: dbExample.uName,
        email: dbExample.email
      });
    });
  });

  app.get('/create', function(req, res) {
    res.render('createProject')
  })

  app.get('/welcome', function (req, res) {
    res.render('welcome')
  })
  app.get('/login', function (req, res) {
    res.render('login')
  })

  app.get('/project/:id', function(req, res) {

    // db.Project.findOne({ where: {id: req.params.id} }).then(function(result){

    //   res.render("project", {msg: result.dataValues})
    // })
    db.Project.findOne({ where: {id: req.params.id}, include: db.User }).then(function(result){

      res.render("project", {msg: result.dataValues})
    })


    
  });


  app.get("/search", function(req, res) {
    db.Project.findAll({
      
      where: {
        [Op.or]: [
          {
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
    }).then((result)=>{

      res.render("index", { msg: result });
    })
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
  
