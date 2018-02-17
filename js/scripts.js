//Pseudo Code
//
//1) User is prompted to allow browser to view location
//2) App uses user's location to retrieve weather from API
//3) App displays the weather for the user's location
//4) Image displays reflecting current weather conditions
//5) Button can be clicked to toggle between farenheit and celsius
//	a) Display farenheit by default, store in variable
//	b) When user clicks button, farenheit is calculated into Celsius
//	c) When button is clicked again, variable containing farenheit value is displayed
//

$(document).ready(function() {
	var latitude;
	var longitude;
	var fareneheit;
	var celsius;
	var city;
	var weatherType;

	//Current Time
	var time;
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();

	if (hours > 12) {
		hours -= 12;
	}

	if (minutes < 10) {
		time = hours + ":0" + minutes;
	} else {
		time = hours + ":" + minutes;
	}

	//Geolocation
	if (navigator.geolocation) { //Prompts user to allow/block browser from viewing location
	  navigator.geolocation.getCurrentPosition(function(position) { //obtains geolocation
	    latitude = position.coords.latitude; 
	    longitude = position.coords.longitude;
		var api="https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
			$.getJSON(api, function(data){
				weatherType = data.weather[0].main;
				city = data.name;
				celsius = data.main.temp;
				farenheit = ((celsius * 1.8) + 32);
				celsius = celsius.toFixed(0);
				farenheit = farenheit.toFixed(0);
				//Write to HTML
				$(".local-time").html(time);
				$(".location").html(city);
				$(".temperature").html(farenheit + "&deg");
				$(".current-weather").html(weatherType);
				//Adjust src of .weather-icon based on weather
				switch(weatherType) {
					case "Snow":
					$(".weather-icon").attr("src", "assets/snow.jpg");
					break;
					case "Cloudy":
					$(".weather-icon").attr("src", "assets/cloudy.jpg");
					break;
					default: 
					$(".weather-icon").attr("src", "");
				}
			});
		});
	}

	//Temperature conversion
	$(".farenheit-button").click(function() {
		$(".temperature").html(farenheit + "&deg");
	});

	$(".celsius-button").click(function() {
		$(".temperature").html(celsius + "&deg"); //displays 0 as -0; need to fix
	});




});