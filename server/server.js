const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(express.json());
let rounds = [];
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

// GET & POST Routes go here
app.get("/game", (req, res) => {
  console.log(req.query);
  // Random Number
  const number = Math.floor(Math.random() * 25);
  // spread query params into guesses, and add number
  let out = { guesses: { ...req.query }, number };
  console.log(out);
  // Push into rounds
  rounds.push(out);
  //Set status
  res.status(201);
  // Send
  res.send(rounds);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
