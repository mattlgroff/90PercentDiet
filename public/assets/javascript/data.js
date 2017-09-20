//Firebase
var config = {
    apiKey: "AIzaSyDLRMhBc5n3Zlm4dBqg6BRIY-C64oCboSk",
    authDomain: "project90percent.firebaseapp.com",
    databaseURL: "https://project90percent.firebaseio.com",
    projectId: "project90percent",
    storageBucket: "project90percent.appspot.com",
    messagingSenderId: "995661683537"
  };

firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function(){ 

    database.ref("/").on("value", function(snapshot) {

      var maleDb = snapshot.child("male");
      var male = maleDb.numChildren();
      console.log("Male users: " + male);

      var femaleDb = snapshot.child("female");
      var female = femaleDb.numChildren();
      console.log("Female users: " + female);

      var totalUsers = female + male;
      console.log("Total users: " + totalUsers);

      var percentFemale = (female / totalUsers) * 100;
      var percentMale = (male / totalUsers) * 100;

      displayHighchart(percentMale,percentFemale);
    });


});


function displayHighchart(percentMale,percentFemale){
        //Highcharts
        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Gender Split Between Users'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Genders',
                colorByPoint: true,
                data: [{
                    name: 'Male',
                    y: percentMale
                },  
                {
                    name: 'Female',
                    y: percentFemale
                }]
            }]
        });
    }
