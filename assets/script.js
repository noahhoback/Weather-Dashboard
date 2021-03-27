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
var APIkey = "e1b762965cd10c81e93e8ed2fa42068a" //<- key i got from signing up for openweather
var todaysDate = moment().format('L');
$("#todays-date").text(todaysDate);


