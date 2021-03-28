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
var clearCitySearch = $('#clear-city-search')
var cityList = [];
var APIkey = "e1b762965cd10c81e93e8ed2fa42068a" //<- key i got from signing up for openweather
var todaysDate = moment().format('L');
$("#todays-date").text(todaysDate);

searchHistoryFunction();
showClear();
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
clearCitySearch.on("click", function(){
    cityList = [];
    listCityArray();
    $(this).addClass("hide");
});

searchHistoryList.on("click", "search-city-button", function(event) {
    var value = $(this).data("value");
    currentWeatherConditions(value);
    searchHistory(value);
});

function currentWeatherConditions(userSearchValue) {
    var APIcallURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearchValue + "&units=imperial&appid=" + APIkey;

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
            
         /*   if (currentUV.innerHTML <= 1) {
                currentUV.addClass("blue")
            }
           if ((currentUV.text(response.value) > 1) && (currentUV.text(response.value) <= 3)) {
                currentUV.addClass("green")
            }
            if ((currentUV.text(response.value) > 3) && (currentUV.text(response.value) <= 5)) {
                currentUV.addClass("yellow")
            }
             if ((currentUV.text(response.value) > 5) && (currentUV.text(response.value) <= 7)) {
                currentUV.addClass("orange")
            }
          if ((currentUV.text(response.value) > 7) && (currentUV.text(response.value) <= 9)) {
                currentUV.addClass("red")
            }
           if ((currentUV.text(response.value) > 9) && (currentUV.text(response.value) <= 3)) {
                currentUV.addClass("pink")
                }
            else (currentUV.addClass("purple"))
*/
        }); 

       
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
                forecastColumn.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemperature);
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

    function searchHistory(userSearchValue) {
       
        if (userSearchValue) {
         
            if (cityList.indexOf(userSearchValue) === -1) {
                cityList.push(userSearchValue);
    
             
                listCityArray();
                clearCitySearch.removeClass("hide");
                weatherInfoDiv.removeClass("hide");
            } else {
        
                var removeIndex = cityList.indexOf(userSearchValue);
                cityList.splice(removeIndex, 1);
    
                cityList.push(userSearchValue);
    
             
                listCityArray();

                clearCitySearch.removeClass("hide");
                weatherInfoDiv.removeClass("hide");
            }
        }
    }

function listCityArray() {
    
    searchHistoryList.empty();
  
    cityList.forEach(function(city){
        var searchHistoryItem = $('<li class="list-group-item city-btn">');
        searchHistoryItem.attr("data-value", city);
        searchHistoryItem.text(city);
        searchHistoryList.prepend(searchHistoryItem);
    });
   
    localStorage.setItem("cities", JSON.stringify(cityList));
    

}

function searchHistoryFunction() {
    if (localStorage.getItem("cities")) {
        cityList = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cityList.length - 1;
     
        listCityArray();
       
        if (cityList.length !== 0) {
            currentWeatherConditions(cityList[lastIndex]);
            weatherInfoDiv.removeClass("hide");
        }
    }
}


function showClear() {
    if (searchHistoryList.text() !== "") {
        clearCitySearch.removeClass("hide");
    }
}

