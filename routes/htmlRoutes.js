module.exports = function(app, db) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("index", { projects: dbExamples });
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

  app.get("/project/:id", function(req, res) {
    db.Project.findOne({ where: { id: req.params.id } }).then(function(result) {
      res.render("project", { msg: result.dataValues });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
