//When the document is loaded, apply the search box and button
$(document).ready(function() {

  $("#searchBox")
  .prepend($("<form class='searchForm'>"));

  $(".searchForm")  
    .append($("<label for='custom'>"))
    .append($("<input type='text' class='form-control' id='custom'>"))
    .append($("<input class='btn' id='searchBtn' type='submit' value='Search'>"));

  $("label").text("USDA Food Search: ");

  $("#searchBtn")
    .on("click", function (){
      event.preventDefault();
      onSend(this);
    })
    .text("Search");

});

//When the search button is pressed, pass our query
function onSend(eventData){

  //Make query our search query
  var query = $("#custom").val();

  //If there is no query
  if (query === ""){

    $("#searchResults").empty();

    clearNutrition();

    $("<div class='error'>")
      .text("No Results Found")
      .appendTo($("#searchResults"));

  }
  else {
    //Wipe out invalid error if it exists
    $(".error")
      .html("");

    //Setting our API Key and URL
    const usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl";
    const usdaSearchUrl = "https://api.nal.usda.gov/ndb/search/";
   
    //Setting our Query Strings for the Ajax Request
    var qs = {
      'api_key': usdaApiKey,
      'q': query,
      'format': 'json',
      'sort': 'r'
    }

    //Wipe out previous results
    clearNutrition();

    //Send our ajax request
    queryAjaxRequest(usdaSearchUrl,qs);

  }

}

//Take the search query from the box and search for it in the USDA db for a ndbno
function queryAjaxRequest(url,qs){

  $.ajax({
      url: url,
      data: qs,
      type: "GET",
      success: function(response) {

          //If there is no results.
          if ('errors' in response){

            $(".error")
                .html("");

            $("<div class='error'>")
                .text("No Results Found")
                .appendTo($("#searchResults"));
          
          }
          //If there is results.
          else {

            //Empty the previous error, if one exists.
            $(".error")
                .html("");

            let itemsList = response.list.item;

            //Make a button for each item in the results list.
            itemsList.forEach(function callback(currentValue, index, array) {
                var name = itemsList[index].name;
                var number = itemsList[index].ndbno;

                $("<button>")
                  .text(name)
                  .data("number", number)
                  .addClass('btn')
                  .on("click", function (){
                    event.preventDefault();
                    resultClicked($(this));
                  })
                  .appendTo($("#searchResults"));
            });

         }

      },
      //If there is an error loading the page.
      error: function(error) {
          console.log("Ajax request failed: " + error);
      }
  });

}

//Happens when someone clicks a result button.
function resultClicked(scope){
  var number = scope.data("number");
  const usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl";
  const usdaUrl = "https://api.nal.usda.gov/ndb/reports/";

  //Query Strings to pass into the ajax request.
  var qs = {
    'api_key': usdaApiKey,
    'type': "b",
    'format': "json",
    'ndbno': number
  }

  //Wipe out previous results.
  clearNutrition();

  //Run the Ajax request
  numberAjaxRequest(usdaUrl,qs,number);
}

function numberAjaxRequest(url,qs,number){

  $.ajax({
      url: url,
      data: qs,
      type: "GET",
      success: function(response) {

          //Set the foodname to appear above the Nutrition List
          $("#foodName").text(response.report.food.name);

          //Make an array out of the nutrients sent to us from USDA
          var nutrientsArr = response.report.food.nutrients;

          //Going over each item of the nutrients array looking for our values
          nutrientsArr.forEach(function callback(currentValue, index, array) {
            if (nutrientsArr[index].name.includes("Energy") ){
              $("#calories").text(nutrientsArr[index].value + " kcal");
            }

            if (nutrientsArr[index].name.includes("Protein") ){
              $("#protein").text(nutrientsArr[index].value + " g");
            }

            if (nutrientsArr[index].name.includes("Carbohydrate") ){
              $("#carbs").text(nutrientsArr[index].value + " g");
            }

            if (nutrientsArr[index].name.includes("Sugars") ){
              $("#sugars").text(nutrientsArr[index].value + " g");
            }

            if (nutrientsArr[index].name.includes("Total lipid") ){
              $("#fat").text(nutrientsArr[index].value + " g");
            }

            if (nutrientsArr[index].name.includes("Fiber") ){
              $("#fiber").text(nutrientsArr[index].value + " g");
            }

          });

      },
      error: function(error) {
          console.log("Ajax request failed: " + error);
      }
  });

}

//Wipe out previous results from the HTML
function clearNutrition(){
  $("#searchResults").empty();

  $("#foodName").text("");
  $("#calories").text("");
  $("#protein").text("");
  $("#sugars").text("");
  $("#carbs").text("");
  $("#fat").text("");
  $("#fiber").text("");
}
  
