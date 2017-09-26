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

      var maleArray18_30 = [];
      var maleArray31_50 = [];
      var maleArray51_65 =[];
      var maleArray65plus = [];


      database.ref("/male").orderByChild("dateAdded").on("value", function(snapshot) {

        $.each(snapshot.val(), function(index, value) {
            var x = value['Height(cm)'];
            var y = value['Weight(kg)'];
            maleArray.push([x,y]);
            var z = parseInt(value['Age']);
            if (z >= 18 && z <= 30){
              maleArray18_30.push(z);
            }
            else if (z >= 31 && z <= 50){
              maleArray31_50.push(z);
            }
            else if (z >= 51 && z <= 65){
              maleArray51_65.push(z);
            }
            else {
              maleArray65plus.push(z);
            }

        }); 

      }); //End Male Ref

      var femaleArray = [];

      var femaleArray18_30 = [];
      var femaleArray31_50 = [];
      var femaleArray51_65 =[];
      var femaleArray65plus = [];


      database.ref("/female").orderByChild("dateAdded").on("value", function(snapshot) {

        $.each(snapshot.val(), function(index, value) {
            var x = value['Height(cm)'];
            var y = value['Weight(kg)'];
            femaleArray.push([x,y]);
            var z = parseInt(value['Age']);
            if (z >= 18 && z <= 30){
              femaleArray18_30.push(z);
            }
            else if (z >= 31 && z <= 50){
              femaleArray31_50.push(z);
            }
            else if (z >= 51 && z <= 65){
              femaleArray51_65.push(z);
            }
            else {
              femaleArray65plus.push(z);
            }
        }); 

      }); //End Female Ref

      displayScatterplot(maleArray,femaleArray);

      var age18_30 = parseInt(maleArray18_30.length) + parseInt(femaleArray18_30.length);
      var age31_50 = parseInt(maleArray31_50.length) + parseInt(femaleArray31_50.length);
      var age51_65 = parseInt(maleArray51_65.length) + parseInt(femaleArray51_65.length);
      var over65 = parseInt(maleArray65plus.length) + parseInt(femaleArray65plus.length);

      displayAgeHighchart( age18_30, age31_50, age51_65, over65, "agePieCharts" , 'Age Split Between Users', 'rgba(225, 0, 0, .5)', 'rgba(225, 225, 0, .5)' , 'rgba(225, 0, 225, .5)', 'rgba(0, 255, 0, .5)' );
      displayAgeHighchart(femaleArray18_30.length , femaleArray31_50.length , femaleArray51_65.length, femaleArray65plus.length, "femaleAge" , "Age Split for Female Users" , "rgba(191, 63, 191, 0.2)", "rgba(223, 71, 223, 0.7)", "rgba(122, 20, 122, 0.7)", "purple");
      displayAgeHighchart(maleArray18_30.length , maleArray31_50.length , maleArray51_65.length, maleArray65plus.length, "maleAge", 'Age Split for Male Users' , "aqua", "turquoise", "cornflowerblue", "teal");

      console.log("Users ages 18 - 30: " + (parseInt(maleArray18_30.length) + parseInt(femaleArray18_30.length)));
      console.log("Users ages 31 - 50: " + (parseInt(maleArray31_50.length) + parseInt(femaleArray31_50.length)));
      console.log("Users ages 50 - 65: " + (parseInt(maleArray51_65.length) + parseInt(femaleArray51_65.length)));
      console.log("Users ages 65 and Older: " + (parseInt(maleArray65plus.length) + parseInt(femaleArray65plus.length)));

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

function displayAgeHighchart(age18_30, age31_50, age51_65, over65, chartArea, chartTitle , color1, color2, color3, color4){
        //Highcharts Pie Chart
        Highcharts.chart(chartArea, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: chartTitle
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
                name: 'Age Groups',
                colorByPoint: true,
                data: [
                {
                    name: '18 - 30',
                    color: color1,
                    y: age18_30
                },  
                {
                    name: '31 - 50',
                    color: color2,
                    y: age31_50
                },  
                {
                    name: '51 - 65',
                    color: color3,
                    y: age51_65
                },  
                {
                    name: '65 and Older',
                    color: color4,
                    y: over65
                }

                ]
            }]
        });
}

