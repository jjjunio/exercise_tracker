const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Handles HTTP GET requests on /exercises/URL path
router.route("/").get((req, res) => {
  // get list of all exercises in db
  Exercise.find()
    // find method returns a promise that are returned in JSON format
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Handles HTTP POST requests on /exercises/add/URL path
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  //after getting all four fields, new instance of exercise is created
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });
  //new exercise saved to db via save() method
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
