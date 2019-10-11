module.exports = function(app, db, stripe) {
  // Get all examples
  app.post('/chargeUser', (req,res) => {
      //things I need
      let projectName = req.body.proName
      let currentUser = req.session.userID
        console.log('cuurent user ',currentUser)
   db.Project.findOne({where: {name: projectName}}).then(project => {
       console.log(project.name)
       console.log(project.desc)
   })

   db.User.findOne({where: {id: currentUser}}).then(user => {
       console.log(user.uName)
   })
  })
};
