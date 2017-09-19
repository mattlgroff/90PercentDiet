// var usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl";
// var nbdno = 01009;
// var usdaUrl = "https://api.nal.usda.gov/ndb/reports/";

// $.ajax({
//     url: usdaUrl,
//     data: { 
//         "api_key": usdaApiKey, 
//         "type": "b", 
//         "format": "json",
//         "nbdno": 01009
//     },
//     type: "GET",
//     success: function(response) {
//         console.log(response);
//     },
//     error: function(error) {
//         console.log(error);
//     }
// });




// var fatsecretApiKey = "399d02dfa89d47b28552a3dee945debe";
// var fatsecretUrl = "http://platform.fatsecret.com/js";

// $.ajax({
//     url: fatsecretUrl,
//     data: { 
//         "key": fatsecretApiKey
//     },
//     type: "GET",
//     success: function(response) {
//         console.log(response);
//     },
//     error: function(error) {
//         console.log(error);
//     }
// });
// 
$(document).ready(function(){

	$("#user-heightMetric").hide();

	$("#metric").on("click", function(){
		$("#feet-imperial").hide();
		$("#inches-imperial").hide();
		$("#user-heightMetric").show();

	});


	$("#imperial").on("click", function(){
		$("#user-heightMetric").hide();
		$("#feet-imperial").show();
		$("#inches-imperial").show();
	});

});