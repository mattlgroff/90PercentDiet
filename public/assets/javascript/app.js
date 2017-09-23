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

var tdeeCalcObject = {
	//Calculates Basal Metabolic Rate
	BMRCalulcator: function (gender, height, weight, age) {
		if (gender === 'female'){
			return parseInt(655 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
		}
		else if (gender === 'male') {	
			return parseInt(66 + (13.7 * weight) + (5 * height) - (6.8 * age));
		}
	},
	// Returns activity factor
	activityFactor: function (activityLevel) {
		if (activityLevel === "sedentary"){
			return 1.2;
		}
		else if (activityLevel === "lightly_active"){
			return 1.375;
		}
		else if (activityLevel === "moderately_active"){
			return 1.55;
		}
		else if (activityLevel === "very_active"){
			return 1.725;
		}
		else if (activityLevel === "extremely_active"){
			return 1.9;
		}
	},
	//Calculates TDEE with activity factor and BMR
	tdeeCalculator: function(gender, height, weight, age, activityLevel) {
		if(gender === "male"){
			var firebaseRef = database.ref("/male");
		}
		else if(gender === "female"){
			var firebaseRef = database.ref("/female");
		}
		//Sending to Firebase
		firebaseRef.push({
				'Height(cm)': Math.round(height),
				'Weight(kg)': Math.round(weight), 
				'Age': age,
				'ActivityLevel': activityLevel,
				'dateAdded': firebase.database.ServerValue.TIMESTAMP
		});		

		var tdeeReccomendation = (tdeeCalcObject.BMRCalulcator(gender, height, weight, age)) * (tdeeCalcObject.activityFactor(activityLevel));
		return parseInt(tdeeReccomendation.toFixed(0));
	}
};

var conversionBetweenMetricAndImperial = {
	//Converts weight in pounds to kilograms
	imperialToMetricConverter_Weight: function(weightInPounds) {
		return parseInt(weightInPounds * 0.45359237);
	},
	//Calculates full height in total inches
	totalInches_Height: function (feet, inches) {
		//Must parseInt on these or we are merging strings
		feet = parseInt(feet);
		inches = parseInt(inches);
		return parseInt((feet * 12) + inches);
	},
	//Converts height in inches to cm
	imperialToMetric_Converter_Height: function(heightInInches) {
	 	heightInInches = parseInt(heightInInches);
	 	return parseInt(heightInInches * 2.54);
	 }
};

var manipulationDOM = {
	//Returns a table row with option to add class, and also appends two columns to the row itself
	appendRow: function(rowClass , weightText , calorieText){
		return $("<tr>")
			.addClass(rowClass)
			.append(
				$("<th>")
					.html(weightText)
				)
			.append(
				$("<th>")
					.html(calorieText)
			)

	}

};

var errorChecking = {
	//Checks for invalid user entry
	formErrorCheck: function(input){
		if (input < 1){
			return true;
		} else {
			return false;
		}
	}
}



$(document).ready(function(){

	//Hide Metric on load
	$("#user-heightMetric").hide();
	$("#weight-lbl").html("lbs");

	//Show Metric on Click
	$("#metric").on("click", function(){
		$("#feet-imperial").hide();
		$("#inches-imperial").hide();
		$("#user-heightMetric").show();
		$("#weight-lbl").html("kg");
		$("#height-lbl").html("cm");
		$("#height-lbl").show();
	});

	//Show Imperial on Click
	$("#imperial").on("click", function(){
		$("#user-heightMetric").hide();
		$("#feet-imperial").show();
		$("#inches-imperial").show();
		$("#weight-lbl").html("lbs");
		$("#height-lbl").hide();
	});

	//Submit form on click
	$("#form-submit").on("click", function(){
		
		$("#user-result").empty();
		event.preventDefault();
		var isImperialChecked = $("#imperial:checked").val();
		var gender = $("#gender-option option:selected").val().trim().toLowerCase();
		var weight = parseInt($("#user-weight").val().trim());
		var age = parseInt($("#user-age").val().trim());
		var activityLevel = $("#activity-option option:selected").attr("id").toLowerCase();
		var tdeeRec = 0;
		var height;

		if(isImperialChecked){
			var height_feet = parseInt($("#feet-heightImperial option:selected").val().trim());
			var height_inches = parseInt($("#inches-heightImperial option:selected").val().trim());
			var errorCheckWeight = weight;
			height = conversionBetweenMetricAndImperial.imperialToMetric_Converter_Height(conversionBetweenMetricAndImperial.totalInches_Height(height_feet, height_inches));
			weight = conversionBetweenMetricAndImperial.imperialToMetricConverter_Weight(weight);

		}
		else {
			 height = parseInt($("#user-heightMetric").val().trim());
		}


		if (errorChecking.formErrorCheck(weight)){
			console.log("Weight Error:" + weight)
			$("#tdCalcErrorDiv").empty();
			$("#tdCalcErrorDiv").append($("<div>")
								.addClass("warning text-center")
								.html("Invalid input. Please enter a valid weight."));

		} else if (errorChecking.formErrorCheck(age)){
			console.log("Age Error:" + age)
			$("#tdCalcErrorDiv").empty();
			$("#tdCalcErrorDiv").append($("<div>")
								.addClass("warning text-center")
								.html("Invalid input. Please enter a valid age."));

		} else if (errorChecking.formErrorCheck(height)){
			console.log("Height Error:" + height)
			$("#tdCalcErrorDiv").empty();
			$("#tdCalcErrorDiv").append($("<div>")
								.addClass("warning text-center")
								.html("Invalid input. Please enter a valid height."));
		}

		else {
			$("#tdCalcErrorDiv").empty();
			if (isImperialChecked){//Imperial is checked
				tdeeRec = tdeeCalcObject.tdeeCalculator(gender, height, weight, age, activityLevel);
			}
			else {
				tdeeRec = tdeeCalcObject.tdeeCalculator(gender, height, weight, age, activityLevel);
			}

			$("<div>")
				.attr("id" , "generated_result")
				.html("Your recommended TDEE to maintain your current weight is: " + tdeeRec + " calories per day!")
				.addClass("panel-body")
				.appendTo("#user-result");

			$("<table>")
				.attr("id" , "weight_maintenance_options")
				.addClass("table table-bordered table-hover table-css")
				.append(
					$("<thead>")
						.append(manipulationDOM.appendRow("text-center", "Weight +/- per week", "Calorie intake per day"))
				)
				.append(
					$("<tbody>")
						.append(manipulationDOM.appendRow("text-center", "2 LB", tdeeRec + 1000))
						.append(manipulationDOM.appendRow("text-center", "1.5 LB", tdeeRec + 750))
						.append(manipulationDOM.appendRow("text-center", "1 LB", tdeeRec + 500))
						.append(manipulationDOM.appendRow("text-center", "0.5 LB", tdeeRec + 250))
						.append(manipulationDOM.appendRow("text-center", "0 LB", tdeeRec))
						.append(manipulationDOM.appendRow("text-center", "-0.5 LB", tdeeRec - 250))
						.append(manipulationDOM.appendRow("text-center", "-1 LB", tdeeRec - 500))
						.append(manipulationDOM.appendRow("text-center", "-1.5 LB", tdeeRec - 750))
						.append(manipulationDOM.appendRow("text-center", "-2 LB", tdeeRec - 1000))
				)
				.appendTo("#user-result");
		}

	});
});