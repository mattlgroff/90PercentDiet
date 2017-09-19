//Converts weight in pounds to kilograms
var imperialToMetricConverter_Weight = function(weightInPounds) {
	return weightInPounds * 0.45359237;
};

//Calculates full height in total inches
var totalInches_Height = function (feet, inches) {
	return (feet * 12) + inches;
};

//Converts height in inches to cm
 var imperialToMetric_Converter_Height = function(heightInInches) {
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
	var tdeeReccomendation = (BMRCalulcator(gender, height, weight, age)) * (activityFactor(activityLevel));
	return parseInt(tdeeReccomendation.toFixed(0));

};

$(document).ready(function(){


	$("#form-submit").on("click", function(){
		event.preventDefault();
		var isImperialChecked = false;
		var gender = $("#gender-option option:selected").val().trim().toLowerCase();
		var weight = parseInt($("#user-weight").val().trim());
		var age = parseInt($("#user-age").val().trim());
		var activityLevel = $("#activity-option option:selected").attr("id").toLowerCase();
		console.log(gender , weight , age , activityLevel);
		var tdeeRec = 0;

		if (isImperialChecked){//Imperial is checked
			var height_feet = 6;
			var height_inches =4;
			var height = totalInches_Height(height_feet, height_inches);
			height = imperialToMetric_Converter_Height(height);
			weight = imperialToMetricConverter_Weight(weight);
			var activityLevel = "moderately_active";
			tdeeRec = tdeeCalculator(gender, height, weight, age, activityLevel);

		}
		else {
			var height = parseInt($("#user-height").val().trim());
			console.log(height);
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