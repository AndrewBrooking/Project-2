module.exports = function(app, db) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("index", { msg: JSON.stringify(dbExamples) });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });

    });
  });
  
  app.get('/project/:id', function(req, res) {

    db.Project.findOne({ where: {id: req.params.id} }).then(function(result){

      res.render("project", {msg: result.dataValues})
    })
    
  })
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
  


  
};
