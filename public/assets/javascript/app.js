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

//Converts weight in pounds to kilograms
var imperialToMetricConverter_Weight = function(weightInPounds) {
	return weightInPounds * 0.45359237;
};

//Calculates full height in total inches
var totalInches_Height = function (feet, inches) {
	//Must parseInt on these or we are merging strings
	feet = parseInt(feet);
	inches = parseInt(inches);
	return (feet * 12) + inches;
};

//Converts height in inches to cm
 var imperialToMetric_Converter_Height = function(heightInInches) {
 	heightInInches = parseInt(heightInInches);
 	return heightInInches * 2.54;
 };

//Calculates Basal Metbaolic Rate
var BMRCalulcator = function (gender, height, weight, age) {
	if (gender === 'female'){
		return 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
	}
	else if (gender === 'male') {	
		return 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
	}
};

//Returns activity factor
var activityFactor = function (activityLevel) {
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
};

//Calculates TDEE with activity factor and BMR
var tdeeCalculator = function(gender, height, weight, age, activityLevel) {
	//TDEE = BMR * Activity Factor
	console.log("TDEE Calculator Double Checking: ");
	console.log("Gender: " + gender);
	console.log("Height: " + height);
	console.log("Weight: " + weight);
	console.log("Age: " + age);
	console.log("Activity Level: " + activityLevel);

	if(gender === "male"){
		var firebaseRef = database.ref("/male");
	}
	else if(gender === "female"){
		var firebaseRef = database.ref("/female");
	}

	//Sending to Firebase
	firebaseRef.push({
			'Height(cm)': height,
			'Weight(kg)': weight, 
			'Age': age,
			'ActivityLevel': activityLevel,
			'dateAdded': firebase.database.ServerValue.TIMESTAMP
	});		

	var tdeeReccomendation = (BMRCalulcator(gender, height, weight, age)) * (activityFactor(activityLevel));
	return parseInt(tdeeReccomendation.toFixed(0));

};

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
	});

	//Show Imperial on Click
	$("#imperial").on("click", function(){
		$("#user-heightMetric").hide();
		$("#feet-imperial").show();
		$("#inches-imperial").show();
		$("#weight-lbl").html("lbs");
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

		if (isImperialChecked){//Imperial is checked
			console.log("Imperial is checked");
			var height_feet = parseInt($("#feet-heightImperial option:selected").val().trim());
			var height_inches = parseInt($("#inches-heightImperial option:selected").val().trim());
			var height = totalInches_Height(height_feet, height_inches);
			height = imperialToMetric_Converter_Height(height);
			weight = imperialToMetricConverter_Weight(weight);
			tdeeRec = tdeeCalculator(gender, height, weight, age, activityLevel);

		}
		else {
			console.log("Metric is checked");
			var height = parseInt($("#user-heightMetric").val().trim());
			tdeeRec = tdeeCalculator(gender, height, weight, age, activityLevel);
		}

		$("<div>")
			.attr("id" , "generated_result")
			.html("Your recommended TDEE to maintain your current weight is: " + tdeeRec + " calories per day!")
			.addClass("panel-body")
			.appendTo("#user-result");

		$("<table>")
			.attr("id" , "weight_maintenance_options")
			.addClass("table")
			.addClass("table-bordered")
			.addClass("table-hover")
			.append(
				$("<thead>")
					.append(
						$("<tr>")
							.addClass("text-center")
							.append(
								$("<th>")
									.html("Weight +/- per week")
							)
							.append(
								$("<th>")
									.html("Calorie intake per day")
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html("2 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec + 1000)
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html("1.5 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec + 750)
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html("1 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec + 500)
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html(".5 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec + 250)
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html("0 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec)
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html("- .5 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec - 250)
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html("- 1 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec - 500)
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html("- 1.5 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec - 750)
							)
					)
			)
			.append(
				$("<tbody>")
					.append(
						$("<tr>")
							.append(
								$("<th>")
									.html("- 2 LB")
							)
							.append(
								$("<th>")
									.html(tdeeRec - 1000)
							)
					)
			)
			.appendTo("#user-result");

	});

});