const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(express.json());
let rounds = [];
let randomNumber = -1;
/**
 {
  guesses: {
    p1: 1,
    p2: 3,
    p3: 6
  },
  actualNumber: 20
 }
 */

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));
app.post("/reset", (req, res) => {
  rounds = [];
  randomNumber = -1;
  res.send(200);
});

// GET & POST Routes go here
app.get("/game", (req, res) => {
  // spread query params into guesses, and add number
  //Set status
  res.status(200);
  // Send
  res.send(rounds);
});
app.post("/game", (req, res) => {
  console.log(req.body);
  // Random Number
  if (randomNumber === -1) {
    randomNumber = Math.floor(Math.random() * 25);
  }
  // spread query params into guesses, and add number
  let out = { guesses: { ...req.body }, actualNumber: randomNumber };
  console.log(out);
  // Push into rounds
  rounds.push(out);
  //Set status
  res.sendStatus(201);
  // Send
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
