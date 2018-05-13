var fs = require('fs');
var request = require('request');
var PDFParser = require("./node_modules/pdf2json");
var pdfParser = new PDFParser();


var download_file_httpget = function(url, dest){
  //download PDF to bucket
require('dotenv/config')

var config = require('./config.js');

var http = require('http');
var url = require('url');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var jsonQ = require("jsonq");


// Goole Cloud Storage
var gcs = config.googleStorage;


var file_url = "http://www.azd.uscourts.gov/sites/default/files/documents/osl_cal.pdf";


var urlObj = new Object();

var todayDate1 = new Date();
var dd1 = todayDate1.getDate();
var mm1 = todayDate1.getMonth()+1; //January is 0
var yyyy1 = todayDate1.getFullYear();
var file_downloadDate = ''+ dd1 + '-'+ mm1 + '-' + yyyy1;


      var file = fs.createWriteStream(dest);
      return new Promise((resolve, reject) => {
        var responseSent = false; // flag to make sure that response is sent only once.
        http.get(file_url, response =>{
          response.pipe(file);
          file.on('finish', () =>{
            file.close(() => {
              if(responseSent)  return;
              responseSent = true;
              resolve();
            });
          });
        }).on('error', err => {
            if(responseSent)  return;
            responseSent = true;
            reject(err);
        });
      })

      .then( ()=>{
      return new Promise((resolve1, reject1) => {
      console.log('downloaded file no issues...')

      var bucketNewFileName = 'osl_cal' + '_' + file_downloadDate +'.pdf';
      var bucketNewFileName1 = './'+ bucketNewFileName

      fs.renameSync('./osl_cal.pdf', bucketNewFileName1);


         console.log('10 pdf load');

            // Reference an existing bucket.
            var bucket = gcs.bucket('osldata-d1ec2.appspot.com');
            bucket.makePublic();

            bucket.upload(bucketNewFileName1, function(err, file) {
              if (err){console.log(err);}
              if (!err) {
                 console.log('file is now in your bucket.');

console.log('11');
var publicURL = `http://osldata-d1ec2.appspot.com.storage.googleapis.com/${bucketNewFileName}`;


              var urlObj = new Object;
                urlObj.publicURL = publicURL;
                 urlObj.bucketNewFileName = bucketNewFileName;
                  console.log("load pdf");
                  resolve1(urlObj);
              }
              });

              });
            })
            .catch( e => console.error('error at en', e));

          };



//////////////////////////////
function mainParse(tiny){
  console.log('1 Start mainParse');
  require('dotenv/config')

  var pdfUrl = "http://www.azd.uscourts.gov/sites/default/files/documents/osl_cal.pdf";

console.log('2');

var config = require('./config.js')


var http = require('http');
var url = require('url');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

  //var sheets = google.sheets('v4');
var jsonQ = require("jsonq");


  var TinyURL = config.TinyURL;
  var _ = config._;
  var plotly = config.plotly;
  var Twitter = config.Twitter;
  var db = config.admin;

  //parse PDF
  console.log('3');
  var pdfPipe = request({url: pdfUrl, encoding:null}).pipe(pdfParser);
console.log("4");

  pdfPipe.on("pdfParser_dataError", err => console.error(err) );

console.log('5');

  pdfPipe.on("pdfParser_dataReady", pdf => {

console.log('6');

  // find current date
  var todayDate1 = new Date();
  var dd = todayDate1.getDate();
  var mmm = todayDate1.getMonth()+1; //January is 0!
  var yyyy = todayDate1.getFullYear();
  var ss = new Date().getSeconds();
  var mm = new Date().getMinutes();

  if(dd<10) {
      dd='0'+dd
  }

  if(mmm<10) {
      mmm='0'+mmm
  }

  todayDate1 = mmm+'/'+dd+'/'+yyyy;
  todayDate2 = mmm+'-'+dd+'-'+yyyy;

  //////////////////////////  found curent date

   //fs.writeFile("oslPDF.json", JSON.stringify(pdf));
   oslJSON = JSON.stringify(pdf);

   const family = jsonQ(oslJSON);

  // T.length finds number of defendants
     var T = family.find('T', function(){
         return this.toLowerCase() == 'atty'
       });

  var attyLength = T.length;

  var monthsLow = /(January|February|March|April|May|June|July|August|September|October|November|December)/;
  var daysLow = /(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/


  var pattern = new RegExp(/(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)%2C%20(January|February|March|April|May|June|July|August|September|October|November|December)%20(\d|\d+\d)%2C%20\d+\d+\d+\d/);

  var docDate = family.find('T', function(){
      return this.match(/(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)%2C%20(January|February|March|April|May|June|July|August|September|October|November|December)%20(\d|\d+\d)%2C%20\d+\d+\d+\d/);
  });


  cleanDocDate = JSON.stringify(docDate.value()).replace(daysLow + "%2C%20", '').replace(/%2C%20|%20/g, ' ');
  parsecleanDocDate = JSON.parse(cleanDocDate);

  var courtDate = new Date(parsecleanDocDate);


  var ddCourt = courtDate.getDate();
  var mmCourt = courtDate.getMonth()+1;
  var yyyyCourt = courtDate.getFullYear();

  if(ddCourt<10) {
      ddCourt='0'+ddCourt
  }

  if(mmCourt<10) {
      mmCourt='0'+mmCourt
  }

  formatedcourtDate = mmCourt+'/'+ddCourt+'/'+yyyyCourt;
  firebaseCourtDate = mmCourt+'-'+ddCourt+'-'+yyyyCourt;


  if (formatedcourtDate !== todayDate1){

    var defendantNumber = db.ref('defendantNumber1');

    var defNum = {}
    defNum[todayDate2] = 0;

    defendantNumber.push(defNum); //send length of defendents to firebase

    Twitter.post('statuses/update', { status: `Operation Streamline may be canceled today. The online docket was last updated ${formatedcourtDate}. Call the clerk's office to find out: 520-205-4200` }, function(err, data, response) {

        if(err){
          console.log("pdf not updated "+ err);
            }
        })

  }else{

console.log("7");

  ///// DOA.length also finds number of people
       var DOA = family.find('T', function(){
       return this.match(/\d\d%2F\d\d%2F\d+\d+\d+\d/);

     });

// Line chart tweet moved to Weekly tweet

  var defendantNumber = db.ref('defendantNumber1');

  var defNum = {}
  defNum[firebaseCourtDate] = attyLength;


  defendantNumber.push(defNum); //send length of defendents to firebase

     var cleanDOA = JSON.stringify(DOA.value()).replace(/%2F/g, '/');
     var parsecleanDOA = JSON.parse(cleanDOA);

    var _todayDate =mmm+'_'+dd+'_'+yyyy+'_'+ss+'_'+mm;

   var timeDifference = parsecleanDOA.map(function(date){
     var today = new Date();
     var ddd = new Date(date);
     var eee = Math.abs(ddd.getTime() - today.getTime());
     var fff = Math.ceil(eee / (1000 * 3600 * 24));
     var ggg = fff - 1;
     return ggg;
   })


  var nights_Held = db.ref(`nightsHeld/1overnightsbefore${_todayDate}`);

console.log("");
   var rowTimeDif = timeDifference.map(function (item) {
      return item;
  }).join(';');


  var mappp = timeDifference.reduce(function(prev, cur) {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  var arrMappp = _.pairs(mappp);


  function appendObjTo(thatArray, objToAppend) {
      return Object.freeze(thatArray.concat(objToAppend));
  };

  // Push daily overnights to firebase


var weekDateConstructDailyPush = db.ref(`weeklyNightsHeld/1overnightsDateOfWeek`);


weekDateConstructDailyPush.once("value", function(snapshot) {


  var v = snapshot.val()
  var overnightsTimeStamp = v.weekTimeStamp

  var WEEKLYnights_Held2 = db.ref(`weeklyNightsHeld/1overnightsWEEK_${overnightsTimeStamp}`);


  WEEKLYnights_Held2.push(mappp);
  console.log('daily input');

});

  nights_Held.set(mappp, function(error){
  if(error){
  console.log(error);
  }else{

///////////////// TINYURL PORTION
var tinyPromise = new Promise(function(resolve, reject) {
 TinyURL.shorten(tiny, function(tweetTinyURL) {
//   console.log(tweetTinyURL + " this is the tiny res callback");
//Returns a shorter version of public bucket URL (tinyurl.com)

resolve(tweetTinyURL)

    })
});
////////////////// TWITTER PORTION

tinyPromise.then(function(tinyPdf) {





  nights_Held.once("value", function(snapshot) {
          var snaps = snapshot.val()

          function keyValues(obj, keys){
            return [keys = Object.keys(obj), keys.map(function(k){return obj[k]})]
          }

          var result = keyValues(snaps);


          var pieLabels = result[0];


          var rePieLab = pieLabels.map(function(a) {
          return a +' Night(s)';
        });

          var trace1 = {
          values: result[1],
          labels: rePieLab,
          type: "pie"
          };

          var layout = {
    title: `${formatedcourtDate}: \nNights Between Defendants' Apprehension And Court Appearance`,
    font: {
      family: "Courier New, monospace",
      size: 12,
      color: "#7f7f7f"
    }
  };

          var figure = { 'data': [trace1], layout: layout };

          var imgOpts = {
            format: 'png',
            width: 800,
            height: 640
            //name: `Days held before ${formatedcourtDate}`
          };

          plotly.getImage(figure, imgOpts, function (error, imageStream) {
             if (error) return console.log ("plotly " + error);

            var fileStreamPie = fs.createWriteStream('1.png');
            var pipeDailyPie = imageStream.pipe(fileStreamPie);

           pipeDailyPie.on('finish', function() {
           var b64contentPie = fs.readFileSync('./1.png', { encoding: 'base64' })

               // first we must post the media to Twitter
               Twitter.post('media/upload', { media_data: b64contentPie }, function (err, data, response) {
           // now we can assign alt text to the media, for use by screen readers and
           // other text-based presentations and interpreters
           var mediaIdStr = data.media_id_string
           var altText = " "
           var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

           Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
             if (err) {console.log(err);}
             if (!err) {
               // now we can reference the media and post a tweet (media will attach to the tweet)
               var params = { status: T.length + ` people are scheduled to appear in Operation Streamline today (${formatedcourtDate}).` + "  Here's the document: " + tinyPdf +"  #osl", media_ids: [mediaIdStr] }

               Twitter.post('statuses/update', params, function (err, data, response) {
                 console.log('finish mainParse');
                if (err) {console.log(err);}
               })
             }
           })
         })
       }); //on.finish

     }); //ploty




            }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });
});
      }

    });


        } //else bracket
    }); // pdfPipe bracket
} //Main parse function bracket



module.exports = {
  changeNodeWeekly: function(){
    //change weekly firebase node to save new week's data
    var clock = require('./clock.js');
    console.log("change node");
    var config = require('./config.js');


    var db = config.admin;

      var todayDate = new Date();

      var dd = todayDate.getDate();
      var mmm = todayDate.getMonth()+1; //January is 0!
      var yyyy = todayDate.getFullYear();
      var ss = todayDate.getSeconds();
      var mm = todayDate.getMinutes();

      if(dd<10) {
          dd='0'+dd
      }

      if(mmm<10) {
          mmm='0'+mmm
      }

     var dateStamp = mmm+'_'+dd+'_'+yyyy+'_'+ss+'_'+mm;


      weekDate = db.ref(`weeklyNightsHeld/1overnightsDateOfWeek`);
      var dateStampObj = new Object();

        dateStampObj.weekTimeStamp = dateStamp;



      weekDate.set(dateStampObj);




    weekDate.once("value", function(snapshot) {

var v = snapshot.val()
var overnightsTimeStamp = v.weekTimeStamp


      global.WEEKLYnights_Held = db.ref(`weeklyNightsHeld/1overnightsWEEK_${overnightsTimeStamp}`);

});


  },
  startDaily: function() {


    var clock = require('./clock.js');

    console.log('Daily');



  var file_url = "http://www.azd.uscourts.gov/sites/default/files/documents/osl_cal.pdf";
var bucketFileName = './osl_cal.pdf';

////////////////// clock.js fires this function
download_file_httpget(file_url, bucketFileName).then(function(response) {

  mainParse(response.publicURL);
  fs.unlinkSync(response.bucketNewFileName);


}, function(error) {
  console.error("main parse Failed!", error);
    })
      .catch( e => console.error('error at mainparse', e));
  },

startWeekly: function() {
  var clock = require('./clock.js');
  console.log('weekly');
var config = require('./config.js');
var init= config.init;
var url = config.url;
var http = config.http;
var exec = config.exec;
var spawn = config.spawn;
var readline = config.readline;
var google = config.google;
var googleAuth = config.googleAuth;


var TinyURL = config.TinyURL;
var _ = config._;
var plotly = config.plotly;
var Twitter = config.Twitter;
var db = config.admin;

//Daily OSL PDF
  var file_url = "http://www.azd.uscourts.gov/sites/default/files/documents/osl_cal.pdf";


// Weekly Line chart tweet section

var defendantNumber = db.ref('defendantNumber1');


var peopleArray = [];

var peoplePromise = new Promise(function(resolve, reject) {
defendantNumber.on("value", function(snapshot) {

 snapshot.forEach((childSnapshot)=> {

   childSnapshot.forEach((data)=>{
var lineChartNum = new Object();

  lineChartNum.date = data.key;
  lineChartNum.people = data.val();

peopleArray.push(lineChartNum);

    })

  })
resolve(peopleArray)
    })
  });


peoplePromise.then(function(response) {

 var dateArray = response.map(function (el) {

var splitDate = el.date.split("-");
var meshDate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
return meshDate;

 });
 var peopleArray = response.map(function (el) { return el.people; });

var dataLine = {
    x: dateArray,
    y: peopleArray,
    type: "scatter"
  };

  var layout = {
title: "Daily Number of Operation Streamline Defendants",
font: {
family: "Courier New, monospace",
size: 11,
color: "#7f7f7f"
}
};

  var figureLine = { 'data': [dataLine], layout: layout };

var imgOpts = {
    format: 'png',
    width: 800,
    height: 640
};
plotly.getImage(figureLine, imgOpts, function (error, imageStream) {
    if (error) return console.log ("plottly line "+ error);

    var fileStream = fs.createWriteStream('lineChartPeople1.png');
    var pipeStream = imageStream.pipe(fileStream);

pipeStream.on('finish', function() {
var b64contentLine = fs.readFileSync('./lineChartPeople1.png', { encoding: 'base64' })
// first we must post the media to Twitter
Twitter.post('media/upload', { media_data: b64contentLine }, function (err, data, response) {
console.log("LOG MEDIA DATA: ")
console.log(data);
// now we can assign alt text to the media, for use by screen readers and
// other text-based presentations and interpreters
var mediaIdStr = data.media_id_string
var altText = " "
var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
if (!err) {
// now we can reference the media and post a tweet (media will attach to the tweet)
var params = { status: '#osl', media_ids: [mediaIdStr] }

Twitter.post('statuses/update', params, function (err, data, response) {
console.log(data.id)
            })
          }
        })
      })


    })



  });
})
// end of weekly line chart tweet section


var weekDateConstructDailyPush = db.ref(`weeklyNightsHeld/1overnightsDateOfWeek`);


weekDateConstructDailyPush.once("value", function(snapshot) {


  var v = snapshot.val()
  var overnightsTimeStamp = v.weekTimeStamp

  var WEEKLYnights_Held1 = db.ref(`weeklyNightsHeld/1overnightsWEEK_${overnightsTimeStamp}`);


var array2 = [];
  var weeklyArray = new Promise(function(resolve, reject) {
  // Read and tweet weekly overnight stats
  WEEKLYnights_Held1.on("value", function(snapshot) {

   snapshot.forEach((childSnapshot)=> {

     childSnapshot.forEach((data)=>{

       var WEEKosl = new Object();
       WEEKosl.days = data.key;
       WEEKosl.people = data.val();
       array2.push(WEEKosl)

     })

   })

resolve(array2);
 });// global weekly bracket

})// Promise passWeeklyPie


weeklyArray.then(function(response) {

  return new Promise((resolve1, reject1) => {

  const daysReduced = response.reduce((a, b) => {
    if (Object.keys(a).length === 0) {
      a[b.days] = b.people
      return a
    } else {
      if (a[b.days])
        a[b.days] += b.people
      else
        a[b.days] = b.people
      return a
    }
  }, {})


  var daysValues = config._.values(daysReduced)
  var daysKeys = config._.allKeys(daysReduced)

  var weeklyPieLab = daysKeys.map(function(a) {
  return a +' Night(s)';
  });

  var trace1 = {
  x: weeklyPieLab,
  y: daysValues,
  type: "bar"
  };

  var layout = {
  title: "This Week: \nNights Between Defendants' Apprehension And Court Appearance ",
  font: {
  family: "Courier New, monospace",
  size: 11,
  color: "#7f7f7f"
  }
  };

  var figure = { 'data': [trace1], layout: layout };

  var imgOpts = {
    format: 'png',
    width: 800,
    height: 640
  };
  plotly.getImage(figure, imgOpts, function (error, imageStream) {
     if (error) return console.log ("plotly weekly pie" + error);

    var fileStream = fs.createWriteStream('weeklyPie.png');

   var pipeWeeklyPie = imageStream.pipe(fileStream)
   pipeWeeklyPie.on('finish', function() {

  var b64contentWeeklyPie = fs.readFileSync('./weeklyPie.png', { encoding: 'base64' });
resolve1(b64contentWeeklyPie);
        }); //.on('finish'
      }); //plotly
})
 }).then(function(b64contentWeeklyPie) {

  Twitter.post('media/upload', { media_data: b64contentWeeklyPie }, function (err, data, response) {
 // now we can assign alt text to the media, for use by screen readers and
 // other text-based presentations and interpreters
 var mediaIdStr = data.media_id_string
 var altText = " "
 var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

 Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
 if (!err) {
  // now we can reference the media and post a tweet (media will attach to the tweet)
  var params = { status: '#osl', media_ids: [mediaIdStr] }

 return Twitter.post('statuses/update', params, function (err, data, response) {

          });
        };
      });
    });

   console.log("finish weekly");

});

});

} //startWeekly Bracket
}; //export Bracket
