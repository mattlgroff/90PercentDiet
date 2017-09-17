//Require Request and Express.
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

var resultsArray = [];
var calories = 0;

//Express
var app = express();
var port = process.env.PORT || 8080; // process.env.PORT lets the port be set by Heroku
app.use(express.static(__dirname + '/public')) // make express look in the public directory for assets (css/js/img)
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port)
});
app.use(bodyParser());
//
app.post('/send', function(request, response){

  
  console.log("Request: " + request.body.content);

  //Take user input from the Ajax Post Request from the search box
  var searchTerm = request.body.content;
  // var searchTerm = "asparagus raw";

  //Send it to our Search USDA Api 
  //searchUsdaApi(searchTerm);
  searchUsdaApi(searchTerm);

  console.log("Sending: " + resultsArray);

  //Our Response
  response.json({
      content: resultsArray
    });

});


function searchUsdaApi(searchTerm){
  var query = searchTerm;
  var results = 10;
  var resultsArray = [];

  var usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl",
    usdaSearchUrl = "https://api.nal.usda.gov/ndb/search/",
    searchUsda = {
      method: 'get',
      qs: {
        'api_key': usdaApiKey,
        'q': query,
        'format': "json",
        'sort': "n",
        'max': results
      },
      url: usdaSearchUrl
    };

  searchApiRequest(searchUsda);

}


function usdaFoodLookup(foodNumber){
  //USDA Info
  var usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl",
      ndbno = "01009",
      usdaUrl = "https://api.nal.usda.gov/ndb/reports/",
      usdaAuth = {
              method: 'get',
              qs: {
                'api_key': usdaApiKey,
                'type': "b",
                'format': "json",
                'ndbno': ndbno
              },
              url: usdaUrl
  };    

  foodLookupApiRequest(usdaAuth);   
  
}


function searchApiRequest(auth){

	request(auth, function(err, res, body){   //Beginning of request

    body = JSON.parse(body).list;

    for (var i = 0; i < 5; i++){

      resultsArray[i] = { "Name": body.item[i].name, "Calories": usdaFoodLookup(body.item[i].ndbno) };
      console.log(resultsArray[i]);
    }
  
    return resultsArray;

	});  //End of Request

  
}

function foodLookupApiRequest(auth){

  request(auth, function(err, res, body){   //Beginning of request

    body = JSON.parse(body);

    calories = body.report.food.nutrients[1].measures[0].label + " " + body.report.food.nutrients[1].measures[0].value;

    return calories;

  });  //End of Request

  
  
}





