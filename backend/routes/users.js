const router = require("express").Router();
let User = require("../models/user.model");

// Handles HTTP GET requests on /users/URL path
router.route("/").get((req, res) => {
  // get list of all users in db
  User.find()
    // find method returns a promise that are returned in JSON format
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Handles HTTP POST requests on /users/add/URL path
router.route("/add").post((req, res) => {
  const username = req.body.username;
  //after getting username new instance of User created
  const newUser = new User({ username });
  //new user saved to db via save() method
  newUser
    .save()
    .then(() => res.json(`User added!`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
