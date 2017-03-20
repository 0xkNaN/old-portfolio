// http only cause of the weather API 
var apikey = "52cb01689db37a9adab912fd3cb23022";
var base_url = "http://api.openweathermap.org/data/2.5/weather?";
var temp_c, temp_f, current_temp = "c";

// get icon
function getIcon(icon){
  switch(icon){
    case "01d": return "wi-day-sunny";
    case "02d": return "wi-day-cloudy";
    case "03d": return "wi-day-cloudy";
    case "04d": return "wi-day-fog";
    case "09d": return "wi-day-showers";
    case "10d": return "wi-day-rain";
    case "11d": return "wi-day-thunderstorm";
    case "13d": return "wi-day-snow";
    // ...
    case "01n": return "wi-night-clear";
    case "02n": return "wi-night-alt-cloudy";
    case "03n": return "wi-night-alt-cloudy";
    case "04n": return "wi-night-alt-cloudy";
    case "09n": return "wi-night-alt-showers";
    case "10n": return "wi-night-alt-rain-wind";
    case "11n": return "wi-night-alt-snow-thunderstorm";
    case "13n": return "wi-night-alt-snow";
    //...
    default: return "wi-cloudy";
  }
}

// Get Data
function getData(lat ,lon){
  var _url = base_url + "lat=" + lat + "&lon=" + lon +"&APPID=" + apikey;
  console.log(_url);
  $.ajax({
    url: _url,
    type: "GET",
    dataType: "json",
    success: function(data){
      
      console.log(data);
      
      var country = data.name;
      var _date = new Date(data.dt * 1000);
      var date = _date.toDateString();
      var icon = data.weather[0].icon;
      var desc = data.weather[0].description;
      var temp = data.main.temp;
      temp_c = Math.ceil(temp - 273.15);
      temp_f = Math.ceil([(temp_c * 9/5) + 32]);
      var humidity = data.main.humidity + "%";
      //var pressure = data.main.pressure;
      var _sun_rise = new Date(data.sys.sunrise * 1000);
      var sun_rise = _sun_rise.toTimeString().split(" ")[0];
      var _sun_set = new Date(data.sys.sunset * 1000);
      var sun_set = _sun_set.toTimeString().split(" ")[0];
      
      //...
      console.log("country: "+country);
      console.log("date: " + date);
      console.log("icon: " + icon);
      console.log("desc: " + desc);
      console.log("temp: " + temp);
      console.log("temp_c: " + temp_c);
      console.log("temp_f: " + temp_f);
      console.log("humidity: " + humidity);
      //console.log("pressure: " + pressure);
      console.log("sun_rise: " + sun_rise);
      console.log("sun_set: " + sun_set);
      
      //...
      $(".country").html(country);
      $(".date").html(date);
      $(".icon > i").addClass(getIcon(icon));
      $(".desc").html(desc);
      //...
      $(".temp > .value").html(temp_c);
      $(".humidity > .value").html(humidity);
      //...
      $(".sun-rise > .value").html(sun_rise);
      $(".sun-set > .value").html(sun_set);
    },
    error: function(){
      console.log("Unable to get the data");
    }
  });
}

// get loc
$.ajax({
  url: "http://ipinfo.io/json?callback=?",
  type: "GET",
  dataType: "json",
  success: function(data){
    var data_arr = data.loc.split(",");
    var lat = data_arr[0];
    var lon = data_arr[1];
    console.log(data);
    getData(lat, lon);
  },
  error: function(){
    console.log("Unable to get your location");
  }
});

$(".temp").on("click", function(){
  if(current_temp == "c"){
    $(".temp > .value").html(temp_f);
    $(".temp > .unity").attr("class", "unity wi wi-fahrenheit");
    current_temp = "f";
  }
  else{
    $(".temp > .value").html(temp_c);
    $(".temp > .unity").attr("class", "unity wi wi-celsius");
    current_temp = "c";
  }
});
