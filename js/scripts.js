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
	var date = new Date();
	var hours = date.getHours();
	if (hours > 12) {
		hours = hours - 12;
	}
	var time = hours + ":" + date.getMinutes();
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    //$(".location").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
	    latitude = position.coords.latitude;
	    longitude = position.coords.longitude;
		var api="https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
			$.getJSON(api, function(data){
				weatherType = data.weather[0].main;
				city = data.name;
				celsius = data.main.temp;
				farenheit = ((celsius * 1.8) + 32);
				$(".location").html(city);
				$(".temperature").html(farenheit.toFixed(0) + "&deg");
				$(".current-weather").html(weatherType);
				$(".local-time").html(time);
			});
		});
	}
});