require('dotenv/config');

//plotly
var PLOTLY_USERNAME = process.env.OSL_PLOTLY_USERNAME;
var PLOTLY_API = process.env.OSL_PLOTLY_API;

var plotly = require('plotly')(PLOTLY_USERNAME, PLOTLY_API);

// twitter
var CONSUMER_KEY = process.env.CONSUMER_KEY;
var CONSUMER_SECRET = process.env.CONSUMER_SECRET;
var ACCESS_TOKEN = process.env.ACCESS_TOKEN;
var ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;

var twit = require('twit');
  var Twitter = new twit({
consumer_key: CONSUMER_KEY,
consumer_secret: CONSUMER_SECRET,
access_token: ACCESS_TOKEN,
access_token_secret: ACCESS_TOKEN_SECRET
});


//Firebase
var admin = require("firebase-admin");
var serviceAccount = require('./osldata-d1ec2-firebase-adminsdk-i97pz-d070ac633e.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://osldata-d1ec2.firebaseio.com"
});
var db = admin.database();

// google storage
var storage = require('@google-cloud/storage');
var gcs = storage({
  projectId: 'osldata-d1ec2',
  keyFilename: './oslData-2ed0fed6aed4.json'
});


// Import Libraries
module.exports = {
http: require('http'),
url: require('url'),
exec: require('child_process').exec,
spawn: require('child_process').spawn,
fs: require('fs'),
readline: require('readline'),
google: require('googleapis'),
googleAuth: require('google-auth-library'),
request: require('request'),

TinyURL: require('tinyurl'),

//Firebase Database
admin: db,

googleStorage: gcs,

_: require('underscore')._,

plotly: plotly,

Twitter: Twitter,
}
