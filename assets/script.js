/* i will need to declare variables for the Weather Dashboard.
These will include:
-the  search bar and search button (and a clear button?)
- all the forecast variables such as temperature, humidity, UV index, etc.

I will then need to figure out a way to grab the users input (city name) in the search bar, and make an API call to the openweather
API that will then populate the current weather conditions of that city.
 initial google search suggests using an AJAX call...will need to search more

 however i fetch the forecast info, ill need to append it to the 5 day forcecast display

i will also want to display the current date and time so perhaps using moment.js again unless there is an easier way
*/



//listing variables i will need before i start code 
var searchHistoryList = $('#search-history-list');
var citySearchInput = $('#city-search');
var citySearchButton = $('#city-search-button'); 
var currentCity = $('#current-city');
var currentTemperature = $('#current-temperature');
var currentHumidity = $('#current-humidity');
var currentWindSpeed = $('#current-wind-speed')
var currentUV = $('#current-uv') ;
var weatherInfoDiv =$('#weather-content');
var clearCitySearch = ('#clear-city-search')
var cityList = [];
var APIkey = "e1b762965cd10c81e93e8ed2fa42068a" //<- key i got from signing up for openweather
var todaysDate = moment().format('L');
$("#todays-date").text(todaysDate);

//coding for the search bar

$(document).on("submit", function() {
    event.preventDefault();
var userSearchValue = citySearchInput.val().trim();
currentWeatherConditions(userSearchValue)
searchHistory(userSearchValue)
citySearchInput.val('');
});

citySearchButton.on("click", function(event){
    event.preventDefault();
    
    var userSearchValue = citySearchInput.val().trim();
    currentWeatherConditions(userSearchValue)
    searchHistory(userSearchValue);
    citySearchInput.val('');
});
clearCitySearch.on("click", function() {
    cityList = [];
    listArray();
});

searchHistoryList.on("click", "search-city-button", function(event) {
    var value = $(this).data("value");
    currentWeatherConditions(userSearchValue);
    searchHistory(value);
});

function currentWeatherConditions(userSearchValue) {
    var APIcallURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearchValue + "&units=imperial&appid=" + APIkey;
}
$.ajax({
    url: APIcallURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    currentCity.text(response.name);
    currentCity.append("<small class='text-muted' id='current-date'>");
        $("#current-date").text("(" + todaysDate + ")");
        currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
        currentTemperature.text(response.main.temp);
        currentTemperature.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWindSpeed.text(response.wind.speed + "MPH");
        
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(response){
            currentUV.text(response.value);
        }); 
        var country = response.sys.country;
        var forecastAPIcall = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + APIkey + "&lat=" + latitude + "&lon=" + longitude;
        $.ajax({
            url: forecastAPIcall,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $('#daily-forecast').empty();
            for (var i = 1; i < response.list.length; i+=8) {
                
                var forecastDates = moment(response.list[i].dt_txt).format("L");
                console.log(forecastDates);
                var forecastColumn= $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemperature = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");

                $('#daily-forecast').append(forecastColumn);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);
                
                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(forecastDates);
                forecastTemperature.text(response.list[i].main.temp);
                forecastTemperature.prepend("Temp: ");
                forecastTemperature.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
                
            }
        });
    });
};

