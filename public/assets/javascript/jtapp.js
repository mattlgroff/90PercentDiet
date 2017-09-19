//Converts weigth in pounds to kilograms
var imperialToMetricConverter_Weight = function(weightInPounds) {
	return weightInPounds * 0.45359237;
};

//Converts weigth in kilogarms to pounds
var metricToImperialConverter_Weight = function(weightInKilograms) {
	return weightInKilograms * 2.20462262185;
};

//Calculates full height in total inches
var totalInches_Height = function (feet, inches) {
	return (feet * 12) + inches;
};

//Converts height in inches to cm
 var metricToImperialConverter_Height = function(heightInInches) {
 	return heightInInches * 2.54;
 };

//Calculates Basal Metbaolic Rate
var BMRCalulcator = function (gender, weight, height, age) {
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
var tdeeFactor = function(gender, height, weight, age, activityLevel) {

};

$(document).ready(function(){


	$("#form-submit").on("click", function(){
		if (true){//Imperial is checked
			event.preventDefault();
			var gender = $(".form-inline option:selected").val().trim();
			var height_feet = ;
			var height_inches = ;
			var weight = pasrseInt($("#user-weight").val().trim());
			var activityLevel = 
		}
		else {

		}
	});

});