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

      //Gender Split Graph
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

      displayGenderHighchart(percentMale,percentFemale);

      //Scatter Plot
      var maleArray = [];
      database.ref("/male").orderByChild("dateAdded").on("value", function(snapshot) {

        $.each(snapshot.val(), function(index, value) {
            var x = value['Height(cm)'];
            var y = value['Weight(kg)'];
            maleArray.push([x,y]);
        }); 

      }); //End Male Ref

      var femaleArray = [];
      database.ref("/female").orderByChild("dateAdded").on("value", function(snapshot) {

        $.each(snapshot.val(), function(index, value) {
            var x = value['Height(cm)'];
            var y = value['Weight(kg)'];
            femaleArray.push([x,y]);
        }); 

      }); //End Female Ref

      displayScatterplot(maleArray,femaleArray);

    });


});

function displayGenderHighchart(percentMale,percentFemale){
        //Highcharts Pie Chart
        Highcharts.chart('genderChart', {
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
                    color: 'rgba(119, 152, 191, .5)',
                    y: percentMale
                },  
                {
                    name: 'Female',
                    color: 'rgba(223, 83, 83, .5)',
                    y: percentFemale
                }]
            }]
        });
}

function displayScatterplot(maleArray, femaleArray){
    Highcharts.chart('scatterPlot', {
      chart: {
          type: 'scatter',
          zoomType: 'xy'
      },
      title: {
          text: 'Height Versus Weight of Project90Percent Users'
      },
      subtitle: {
          text: 'Source: Project90Percent'
      },
      xAxis: {
          title: {
              enabled: true,
              text: 'Height (cm)'
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
      },
      yAxis: {
          title: {
              text: 'Weight (kg)'
          }
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 100,
          y: 70,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
          borderWidth: 1
      },
      plotOptions: {
          scatter: {
              marker: {
                  radius: 5,
                  states: {
                      hover: {
                          enabled: true,
                          lineColor: 'rgb(100,100,100)'
                      }
                  }
              },
              states: {
                  hover: {
                      marker: {
                          enabled: false
                      }
                  }
              },
              tooltip: {
                  headerFormat: '<b>{series.name}</b><br>',
                  pointFormat: '{point.x} cm, {point.y} kg'
              }
          }
      },
      series: [{
          name: 'Female',
          color: 'rgba(223, 83, 83, .5)',
          data: femaleArray

      }, {
          name: 'Male',
          color: 'rgba(119, 152, 191, .5)',
          data: maleArray
      }]
  });


}
