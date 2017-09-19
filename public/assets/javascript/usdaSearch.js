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

function onSend(eventData){

  var query = $("#custom").val();

  const usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl";
  const usdaSearchUrl = "https://api.nal.usda.gov/ndb/search/";
 
  var qs = {
    'api_key': usdaApiKey,
    'q': query,
    'format': 'json',
    'sort': 'r'
  }

  clearNutrition();

  queryAjaxRequest(usdaSearchUrl,qs);

}

function queryAjaxRequest(url,qs){

  $.ajax({
      url: url,
      data: qs,
      type: "GET",
      success: function(response) {
          let itemsList = response.list.item;

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

      },
      error: function(error) {
          console.log(error);
      }
  });

}

function resultClicked(scope){
  var number = scope.data("number");

  var usdaApiKey = "iBklKDIgJEc6JVRhYE3OX7AvpEChxD1953KbPgSl";
  var usdaUrl = "https://api.nal.usda.gov/ndb/reports/";

  var qs = {
    'api_key': usdaApiKey,
    'type': "b",
    'format': "json",
    'ndbno': number
  }

  clearNutrition();


  numberAjaxRequest(usdaUrl,qs,number);
}

function numberAjaxRequest(url,qs,number){

  $.ajax({
      url: url,
      data: qs,
      type: "GET",
      success: function(response) {

          $("#foodName").text(response.report.food.name);

          var nutrientsArr = response.report.food.nutrients;

          nutrientsArr.forEach(function callback(currentValue, index, array) {
            if (nutrientsArr[index].name === "Energy"){
              $("#calories").text(nutrientsArr[index].value + " kcal");
            }

            if (nutrientsArr[index].name === "Protein"){
              $("#protein").text(nutrientsArr[index].value + " g");
            }

            if (nutrientsArr[index].name === "Carbohydrate, by difference"){
              $("#carbs").text(nutrientsArr[index].value + " g");
            }

            if (nutrientsArr[index].name === "Sugars, total"){
              $("#sugars").text(nutrientsArr[index].value + " g");
            }

            if (nutrientsArr[index].name === "Total lipid (fat)"){
              $("#fat").text(nutrientsArr[index].value + " g");
            }

            if (nutrientsArr[index].name === "Fiber, total dietary"){
              $("#fiber").text(nutrientsArr[index].value + " g");
            }

          });

      },
      error: function(error) {
          console.log(error);
      }
  });

}

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
  
