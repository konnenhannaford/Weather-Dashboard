// this is from nicks tutorial examplre-------
// var locationEl = document.querySelector("#location");
// var tempVal = document.querySelector("#temp");
// var humidVal = document.querySelector("#humid");
// var windspVal = document.querySelector("#windsp");
// var uviVal = document.querySelector("#uvi");
// async function getWeatherData() {
//     var fivedayforecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationEl.value}&appid=${APIkey}&units=metric`)
//     .then(response => response.json())
//     console.log(fivedayforecast)
//     var oneCall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayforecast.city.coord.lat}&lon=${fivedayforecast.city.coord.lon}&appid=${APIkey}&units=metric`)
//     .then(response => response.json())
//     console.log(oneCall)
//     // var uvIndex = 
//     tempVal.textContent= oneCall.current.temp + " *Cel"
//     // tempVal.textContent= oneCall.current.temp 
//     // tempVal.textContent= oneCall.current.temp
//     // tempVal.textContent= oneCall.current.temp
// }
// locationEl.addEventListener("keydown", function(event){
//     if (event.keyCode === 13){
//         getWeatherData();
//     }
// })

// const form = document.querySelector(".top-banner form");

// form.addEventListener("submit", e => {
//   e.preventDefault();

//     alert()

//   const inputVal = input.value;
// });

// this is from zachs save to local storge-------
// var searchHistory = JSON.parse(storedSearches);
//     for (let i = 0; i < searchHistory.length; i++) {
//         var search = document.createElement('button'); //create button of search value
//         search.classList.add("w-100");
//         search.textContent = searchHistory[i];
//         history.appendChild(search);
// searches.push(city);  localStorage.setItem("searchHistory", JSON.stringify(searches));


// this is the code to run-------

$(document).ready(onReady)

function onReady() {
   $('#submitButton').on('click',onClickSubmitButton)
   renderCityButttons()
}

// $(document).ready(function(){
//     $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
//     createTimeRows()

var storedSearches = JSON.parse(localStorage.getItem("storageArray"));
let mySearchedList = storedSearches || []

function onClickSubmitButton() {
    let myText = $('#inputEl').val()
    mySearchedList.push(myText)
    localStorage.setItem("storageArray", JSON.stringify(mySearchedList))
    renderCityButttons()
    getWeather(myText)
}

function renderCityButttons() {
    let myHistory = $("#searchHistory")
    myHistory.empty()
    mySearchedList.forEach(element => {
        let buttonEL = $("<button/>").appendTo(myHistory)
        $(buttonEL).on('click',onClickHistoryButtons)
        $(buttonEL).addClass("btn btn-outline-primary col-10")
        $(buttonEL).text(element)
    });
}

function onClickHistoryButtons() {
    console.log(this)
}

function getWeather(cityName) {
    let myUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=f91eaf46e0bf96dd19136475c9928ef1"
    $.ajax({
        type:"GET",
        url:myUrl,
    }).then(response=>{
        let date = response.list[0].dt_txt
        let icon = response.list[0].weather[0].icon
        let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        let mycard = 
        $(`<div class="card-body">
        <h5 class="card-title">${date}</h5>
        <div><img src="${iconUrl}" alt="weather icon"></div>
        </div>`)
        $("#mycard").append(mycard)
    })}