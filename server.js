/*************************/
/***   Configuration   ***/
/*************************/
// Set your main file here
var mainFile = '/app/index.html';

// Set your available localhost port here
var localhostPort = 9050;
/*************************/
/*** End Configuration ***/
/*************************/

var express = require('express');
var dotenv = require('dotenv');
var jsonfile = require('jsonfile');

dotenv.load();

// Start the server
var localhost = express();

localhost.use(express.static(__dirname));

// Get the URL and redirect http to https in production environment else redirect to the main file
localhost.get(/.*/, function (req, res, next) {
//    var env = process.env.NODE_ENV;
//    res.json({environment: env});
    if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production')
        res.redirect('https://'+ req.hostname + req.url);
    else
//        next() /* Continue to other routes if we're not redirecting */
        res.sendFile(__dirname + mainFile);
});

localhost.listen(process.env.PORT || localhostPort, function () {
    console.log("Start surfing at localhost:%d", localhostPort);
});