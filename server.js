// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Star Wars Characters (DATA)
// =============================================================
var reservations = [{
  routeName: "yoda",
  name: "Yoda",
  numGuests: "5",
  email: "yodaman@yoda.com",
  phone: "555-555-5555",
  place: "1",
  status: "reservation"
}, {
  routeName: "darthmaul",
  name: "Darth Maul",
  numGuests: "33",
  email: "atthemaul@maul.com",
  phone: "555-555-5555",
  place: "2",
  status: "reservation"
}, {
  routeName: "obiwankenobi",
  name: "Obi Wan Kenobi",
  numGuests: "2",
  email: "obiwan@obiwan.com",
  phone: "555-555-5555",
  place: "3",
  status: "reservation"
}];


app.use(express.static('css'));


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/viewRes", function(req, res) {
  res.sendFile(path.join(__dirname, "viewRes.html"));
});

app.get("/makeRes", function(req, res) {
  res.sendFile(path.join(__dirname, "makeRes.html"));
});

// Get all characters
app.get("/all", function(req, res) {
  res.json(reservations);
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:reservations?", function(req, res) {
  var chosen = req.params.reservations;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
