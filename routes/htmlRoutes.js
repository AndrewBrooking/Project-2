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
      db.User.findOne({ where: { id: result.UserId } }).then(function(result2) {
        res.render("project", { proName: result.name, creator: result2.uName, dateMade: result.createdAt, pic:result.img });
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
