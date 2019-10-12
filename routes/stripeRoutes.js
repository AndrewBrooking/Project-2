module.exports = function(app, db, stripe) {
  // Get all examples


  app.post('/chargeUser', (req,res) => {
     // things I need
      db.User.findOne({where:{email: req.body.email}}).then(user => {
        console.log(user.uName)
      })
      console.log(req.body)
      let amount = req.body.amount * 100
      let projectName = req.body.proName
      let userEmail = req.body.email
      let userName = req.body.uName
      let currentUser = req.session.userID
      console.log(req.body)
        console.log('cuurent user ',currentUser)
        console.log(amount, "amount")
   db.Project.findOne({where: {name: projectName}}).then(project => {
       console.log(project.name)
       console.log(project.desc)
   })

   db.User.findOne({where: {id: currentUser}}).then(user => {
       console.log(user.uName)
   })
   const token = req.body.stripeToken;
   console.log(token)
   stripe.customers.create({
    source: token,
    email : userEmail,
    name: userName
     
 }, function(err, customer){
     console.log(customer.id)
     stripe.charges.create({
         amount: amount,
         currency: "usd",
         customer: customer.id,
         description: `Charge for customer ${userName} for $${amount/100} on behalf of the ${projectName} project`,
     }, function(err, charge){
         console.log('charge', charge)
     })
 })
     res.redirect('/success');
  })
};
