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
	var getTime = function () {
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
	//setInterval(getTime, 1000);//runs getTime every second to acquire updated time; should we also update the weather?
	//Would need to re-add date, hours, and minutes if we use setInterval in the future!

	//Geolocation
	if (navigator.geolocation) { //Prompts user to allow/block browser from viewing location
	  navigator.geolocation.getCurrentPosition(function(position) { //obtains geolocation
	    latitude = position.coords.latitude; 
	    longitude = position.coords.longitude;
		var api="https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
			$.getJSON(api, function(data){
				weatherType = data.weather[0].main;
				city = data.name;
				country = data.sys.country;
				celsius = data.main.temp;
				farenheit = ((celsius * 1.8) + 32);
				celsius = celsius.toFixed(0);
				farenheit = farenheit.toFixed(0);
				//Corrects issue of celsius displaying as -0;
				if (celsius === -0) {
					celsius = 0;
				}
				//Write to HTML
				$(".location").html(city + ", " + country);
				$(".temperature").html(farenheit + "&deg; F");
				$(".current-weather").html(weatherType);
				//Adjust src of .weather-icon based on weather
				$(".weather-icon-container").append("<img class='weather-icon' alt='Weather Description'>");
				switch(weatherType) {
					case "Snow":
					$(".weather-icon").attr("src", "assets/snow.png");
					break;
					case "Clouds":
					$(".weather-icon").attr("src", "assets/cloudy.png");
					break;
					case "Thunderstorm":
					$(".weather-icon").attr("src", "assets/thunder.png");
					break;
					case "Rain":
					case "Drizzle":
					$(".weather-icon").attr("src", "assets/rain.png");
					break;
					// case ("Clear"):
					// $(".weather-icon").attr("src", "assets/clear.png");
					// break;
					case "Mist":
					$(".weather-icon").attr("src", "assets/mist.png");
					break;
					case "Sunny":
					$(".weather-icon").attr("src", "assets/sunny.png");
					break;
					default: 
					$(".weather-icon").attr("src", "");
				}

				//Test to determine whether to use sun or moon for clear conditions
				if(weatherType === "Clear" && (hours <= 6 || hours >= 19)) {
					$(".weather-icon").attr("src", "assets/clear.png");
				} else {
					$(".weather-icon").attr("src", "assets/sunny.png");
				}

				//Hide load screen; try to use CSS animations instead
				setTimeout(function() {
					document.getElementById("load-screen").className = "hide";
				}, 100);
			});
		});
	}

	//Temperature conversion
	$(".farenheit-button").click(function() {
		$(".temperature").html(farenheit + "&deg; F");
	});

	$(".celsius-button").click(function() {
		$(".temperature").html(celsius + "&deg; C");
	});
});