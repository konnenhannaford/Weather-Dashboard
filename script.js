$(document).ready(onReady)
function onReady() {
   $('#submitButton').on('click',onClickSubmitButton)
   renderCityButtons()
}

var storedSearches = JSON.parse(localStorage.getItem("storageArray"));
let mySearchedList = storedSearches || []

function onClickSubmitButton() {
    let myText = $('#inputEl').val()
    mySearchedList.push(myText)
    localStorage.setItem("storageArray", JSON.stringify(mySearchedList))
    renderCityButtons()
    getWeather(myText)
}

    mySearchedList = []; // <<<<<<<<<<<<<<< HERE

    //search through array here...
    for (var i = 0; i < mySearchedList.length; i++) {
        storedSearches = mySearchedList[i].myText;
    }

function onClickSubmitButton2(val) {
    var value  = val;   
    mySearchedList.push(value)
    localStorage.setItem("storageArray", JSON.stringify(mySearchedList))
    renderCityButtons()
    getWeather(value)
}

function renderCityButtons() {
    let myHistory = $("#searchHistory")
    myHistory.empty()
    var button = "";
    mySearchedList.forEach(element => {
        let buttonEL = $("<button>").appendTo(myHistory)
       $(buttonEL).on('click',onClickHistoryButtons)

       console.log(buttonEL);

        $(buttonEL).addClass("btn btn-outline-primary col-12 historybtn")
        $(buttonEL).text(element)
    button +='<button class="btn btn-outline-primary col-12 historybtn" onclick="onClickSubmitButton2('+"'"+element+"'"+')">'+element+'</button>'

      console.log(element)

    });

    myHistory.html(button);
}

$("#searchHistory").on("click","historybtn",function(){
    alert("")
    var city  = $(this).html();
    alert(city);

})

function onClickHistoryButtons() {
    console.log(this)
}

// current day forecast
function getWeather(cityName) {
    let firstCall = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=f91eaf46e0bf96dd19136475c9928ef1";
    $.ajax({
        type:"GET",
        url:firstCall,
    }).then(response1=>{
    let secondCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${response1.coord.lat}&lon=${response1.coord.lon}&appid=f91eaf46e0bf96dd19136475c9928ef1&units=metric`;
    $.ajax({
        type:"GET",
        url:secondCall,
    }).then(response2=>{

        let date = new Date().toDateString()
        let cityname = response1.name;
        let icon = response1.weather[0].icon
        let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        let temp = response2.current.temp;     
        let humidity = response2.current.humidity;
        let wind = response2.current.wind_speed;
        let uvi = response2.current.uvi;
        
        let mycard = 
        $(
            `<div class="card">
        <div class="card-body">
        <h3 class="card-title red">${cityname}</h3>
        <h5 class="card-title red">${date}</h5>
        <div><img src="${iconUrl}" alt="weather icon"></div>
        <div><p>Temp: ${temp} °C</p></div>     
        <div><p>Humidity: ${humidity} %</p></div>
        <div><p>Wind Speed: ${wind} km/h</p></div>
        <div><p id="uviIndex">UVI Index: ${uvi} INDEX</p></div>`
        )
        $("#mycard").append(mycard)
        })})}