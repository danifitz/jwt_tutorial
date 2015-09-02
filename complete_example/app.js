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

//
// A route to our secret data that we want to protect
//
router.get('/secretdata', function(req, res) {

  var token = req.headers.authorization.split(' ')[1];

  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecretPassphrase', function(err) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, return success
        res.status(200).send({
          success: true,
          message: 'Shaked, not stirred.'
        });
      }
    });
  } else {
    res.status(401).send({
      success: false,
      message: 'You expect me to talk Goldfinger? No, Mr Bond. I expect you to die!'
    });
  }

});


  // When a user POST's to /auth with a profile object in the body of the request,
  // they will be issued a JSON Web Token. In the client application you can store
  // this using HTML5 local storage for use in subsequent requests that require
  // authorization. A sample of the profile JSON would be:
  //
  //   {
  //     "profile": {
  //       "username": "DanielFitzgerald",
  //       "password": "verySecurePassword",
  //       "firstName": "Daniel",
  //       "lastName": "Fitzgerald",
  //       "email": "dan@dan.com"
  //     }
  //   }
  //
  //
router.post('/auth', function(req, res) {


  // Check the user credentials supplied by the user. For this tutorial
  // we are simply comparing strings, in a real life example you would
  // be fetching credentials from a database of some kind

  if (!(req.body.profile.username === 'DanielFitzgerald' && req.body.profile.password === 'verySecurePassword')) {
    res.status(401).send('Wrong username or password');
    return;
  }

  var profile = {
    first_name: req.body.profile.firstName,
    last_name: req.body.profile.lastName,
    email: req.body.profile.email,
    id: 1234
  };


  // jwt.sign() takes three parameters:
  //   1. the profile object we created earlier using information we got from the http request
  //   2. a secret passphrase that is used as the key to sign the token
  //   3. an options object, I have set the expiresInMinutes attribute, for a full list
  //      of available options see https://github.com/auth0/node-jsonwebtoken

  var token = jwt.sign(profile, 'superSecretPassphrase', {
    expiresInMinutes: 60 * 5
  });

  console.log('issuing JWT auth token to ' + profile.first_name + ' ' + profile.last_name);

  res.json({
    token: token
  });
});

// REGISTER OUR ROUTES -------------------------------
app.use(router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
