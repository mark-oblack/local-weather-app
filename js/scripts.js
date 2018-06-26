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


let proxy = "https://cors-anywhere.herokuapp.com/";
let api = "https://api.darksky.net/forecast/62068efe0e8f1769f4c18f8d24d0665c/";
let fahrenheit;
let celsius;
let weatherType;
let weatherIcon;

$(document).ready(function() {
	//Geolocation
  	navigator.geolocation.getCurrentPosition(function(position) { //obtains geolocation
  		let latitude = position.coords.latitude;
  		let longitude = position.coords.longitude;
	    let url = proxy + api + latitude + "," + longitude;
		$.getJSON(url, function(data){
			console.log(data);
			weatherType = data.currently.summary;
			weatherIcon = data.currently.icon;
			let city = data.city;
			let country = data.country;
			fahrenheit = data.currently.temperature;
			celsius = ((fahrenheit - 32) * (5/9));
			celsius = celsius.toFixed(0);
			fahrenheit = fahrenheit.toFixed(0);
		}).done(function() {
			//Current Time
			let time;
			let date = new Date();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			function getTime () {
				if (hours > 12 && minutes < 10) {
					time = (hours - 12) + ":0" + minutes + " PM";
				} else if (hours < 12 && minutes < 10) {
					time = hours + ":0" + minutes + " AM";
				} else if (hours > 12 && minutes > 10) {
					time = (hours - 12) + ":" + minutes + " PM";
				} else if (hours === 12 && minutes < 10) {
					time = hours + ":0" + minutes + " PM";
				} else if (hours === 12 && minutes > 10) {
					time = hours + ":" + minutes + " PM";
				} else if (hours === 0 && minutes < 10) {
					time = (hours + 12) + ":0" + minutes + " AM";
				} else if (hours === 0 && minutes > 10) {
					time = (hours + 12) + ":" + minutes + " AM";
				} else {
					time = hours + ":" + minutes + " AM";
				}

				$(".local-time").html("@ " + time);
			}

			getTime();
			//Write to HTML
			// $(".location").html(city + ", " + country);
			$(".temperature").html(fahrenheit + "&deg; F");
			$(".current-weather").html(weatherType);
			//Adjust src of .weather-icon based on weather
			$(".weather-icon-container").append("<img class='weather-icon' alt='" + weatherIcon + "-icon'/>");
			switch(weatherIcon) {
				case "clear-day":
				$(".weather-icon").attr("src", "assets/clear-day.png");
				break;
				case "clear-night":
				$(".weather-icon").attr("src", "assets/clear-night.png");
				break;
				case "partly-cloudy-day":
				$(".weather-icon").attr("src", "assets/partly-cloudy-day.png");
				break;
				case "partly-cloudy-night":
				$(".weather-icon").attr("src", "assets/partly-cloudy-night.png");
				break;
				case "cloudy":
				$(".weather-icon").attr("src", "assets/cloudy.png");
				break;
				case "rain":
				$(".weather-icon").attr("src", "assets/rain.png");
				break;
				case "sleet":
				$(".weather-icon").attr("src", "assets/sleet.png");
				break;
				case "snow":
				$(".weather-icon").attr("src", "assets/snow.png");
				break;
				case "wind":
				$(".weather-icon").attr("src", "assets/wind.png");
				break;
				case "fog":
				$(".weather-icon").attr("src", "assets/fog.png");
				break;
				default: 
				$(".weather-icon").attr("src", "");
			}

			//Hide load screen; try to use CSS animations instead
			setTimeout(function() {
				document.getElementById("load-screen").className = "hide";
			}, 100);
		});
	});
});

//Temperature conversion
$(".fahrenheit-button").click(function() {
	$(".temperature").html(fahrenheit + "&deg; F");
});

$(".celsius-button").click(function() {
	$(".temperature").html(celsius + "&deg; C");
});