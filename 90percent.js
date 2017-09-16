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
app.post('/send', function(req, res){

  res.json(
    {content: 'Server Response.'}
    );
  console.log("Request: " + req.body.content);
});

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

//Calling our apiRequest and console.log the body
apiRequest(usdaAuth);      

function apiRequest(auth){
	request(auth, function(err, res, body){   //Beginning of request
		var body = JSON.parse(body);
    console.log(body.report.food.name);
    console.log(body.report.food.nutrients[1].value);

	});  //End of Request
}





