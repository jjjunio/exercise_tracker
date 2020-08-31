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

//returns exercise item given id
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

//deletes exercise item given id
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//updates exercise item given id
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      //saves the updated object in the db
      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
