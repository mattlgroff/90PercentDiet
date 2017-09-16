//Require Request and Express.
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

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

  //Send it to our Search USDA Api 
  //searchUsdaApi(searchTerm);

  //Our Response
  response.json
    ({
      content: searchUsdaApi(searchTerm)
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

  var body = apiRequest(searchUsda);

  console.log(body);

  // for (var i = 0; i < results; i++){
  //   resultsArray[i] = { "Name": body.list.item[i].name, "NDBNO": body.list.item[i].ndbno };
  //   console.log(resultsArray[i]);
  // }

  // return resultsArray;
  
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

  var body = apiRequest(usdaAuth);   

  console.log(body.report.food.name);

  console.log(body.report.food.nutrients[1].value);
}


function apiRequest(auth){
	request(auth, function(err, res, body){   //Beginning of request
    
    return body;

	});  //End of Request
}





