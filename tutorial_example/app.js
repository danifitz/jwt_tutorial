'use strict';
/*
 * Credit goes to Chris Sevilleja (@sevilayha) who wrote:
 * https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
 * and created this basic app.js file configuration for creating a basic REST API.
 * I have used it here for simplicity.
 */

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// here I've run '$npm install jsonwebtoken --save' to fetch the jsonwebtoken
// node module that we will use in this tutorial
var jwt = require('jsonwebtoken');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

app.get('/', function(req, res) {
  res.json({"result" : "Hooray, our API is working!"}).send();
});

// Paste the route to issue a JSON Web Token here


// Paste the secret data route here


// REGISTER OUR ROUTES -------------------------------
app.use(router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
