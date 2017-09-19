//Require Request and Express.
const request = require('request');
const express = require('express');
// const bodyParser = require('body-parser');

//Express
var app = express();
var port = process.env.PORT || 8080; // process.env.PORT lets the port be set by Heroku
app.use(express.static(__dirname + '/public')) // make express look in the public directory for assets (css/js/img)
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port)
});
// app.use(bodyParser());

// app.post('/send', function(request, response){
//   const searchTerm = request.body.content;

//   searchUsdaApi(searchTerm)
//   .then(data => {
//     console.log(data);

//      var resultObj = {
//       content: data
//     }

//     response.json(resultObj)
//   })
// });


// function searchUsdaApi (searchTerm) {
//   // let resultsArray = [];
//   // const results = 5;
//   var usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl",
//   usdaSearchUrl = "https://api.nal.usda.gov/ndb/search/",
//   searchUsda = {
//     url: usdaSearchUrl,
//     method: 'get',
//     qs: {
//       'api_key': usdaApiKey,
//       'q': searchTerm,
//       'format': 'json',
//       'sort': 'n',
//       'max': results
//     }
//   };

//   return searchApiRequest(searchUsda)
//   .then(data => {
//     console.log("Inside searchApiRequest promise");

//     //var resultsArray = [];
//     //let promises = []

//     //for (let i = 0; i < results; i++) {

//       var name = data.item[0].name;

//       // promises.push(usdaFoodLookup(data.item[i]))
//       var results = usdaFoodLookup(data.item[0].ndbno).then(function(body){

//         console.log("Inside usdaFoodLookup promise= " + 0);

//         var nutrient1 = body.nutrients[0].unit + " of " + body.nutrients[0].name + " in 100g: " + body.nutrients[0].value;
//         var nutrient2 = body.nutrients[1].unit + " of " + body.nutrients[1].name + " in 100g: " + body.nutrients[1].value;

//         var results = { "Name": name, "Nutrient1": nutrient1, "Nutrient2": nutrient2 };

//         return results;

//       })
//       .catch(function(error){
//         console.log("Error: " + error);
//       }); //End usdaFoodLookup Promise
      
//       return results;
//       //promises.push(promise)
      
//     //}
//     //I am dumb and this won't work. Not async ready
//     // return Promise.all(promises).then(function(){ 
//     //   console.log(resultsArray);
//     // });
//     // thing().then(resultsArray => {})
//     //return resultsArray;

//   }) //End searchRequestPromise

//   .catch(function(error){
//     console.log("Error: " + error);
//    });

// }

// function usdaFoodLookup(foodNumber){
  // //USDA Info
  // var usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl",
  //     usdaUrl = "https://api.nal.usda.gov/ndb/reports/",
  //     usdaAuth = {
  //             method: 'get',
  //             qs: {
  //               'api_key': usdaApiKey,
  //               'type': "b",
  //               'format': "json",
  //               'ndbno': foodNumber
  //             },
  //             url: usdaUrl
  // };    

//   return foodLookupApiRequest(usdaAuth);   
  
// }

// function searchApiRequest(auth){
//   return new Promise(function(resolve, reject){

//       request(auth, function(err, res, body){
//           // in addition to parsing the value, deal with possible errors
//           if (err) return reject(err);

//           try {
//               // JSON.parse() can throw an exception if not valid JSON
//               resolve(JSON.parse(body).list);
//           } catch(e) {
//               reject(e);
//           }
//       });
//   });
// }

// function foodLookupApiRequest(auth){
//   return new Promise(function(resolve, reject){

//       request(auth, function(err, res, body){
//           // in addition to parsing the value, deal with possible errors
//           if (err) return reject(err);

//           try {
//               // JSON.parse() can throw an exception if not valid JSON
//               resolve(JSON.parse(body).report.food);
//           } catch(e) {
//               reject(e);
//           }
//       });
//   });
// }




