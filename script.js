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

function getWeather(cityName) {
    // let myUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=f91eaf46e0bf96dd19136475c9928ef1";
    let myUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=f91eaf46e0bf96dd19136475c9928ef1";
    // let myUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${=f91eaf46e0bf96dd19136475c9928ef1"}&units=metric}

    $.ajax({
        type:"GET",
        url:myUrl,
    }).then(response=>{

        console.log(response)
        
        let date = new Date();
        
       

// need to se see why times are all the same
        // let date = response.list[0].dt_txt
 
        console.log(response)

        let cityname = response.name;
        let icon = response.weather[0].icon
        let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        let temp = response.main.temp;
        
        let humidity = response.main.humidity;
        let wind = response.wind.speed;
        let uv = response.main.temp;
        

        let mycard = 
        $(
            `<div class="card">
        <div class="card-body">
        <h3 class="card-title red">${cityname}</h3>
        <div><h2>${date}</h2></div>
        <div><img src="${iconUrl}" alt="weather icon"></div>
        <div><h1>${temp} °C</h1></div>     
        <div><h1>${humidity} %</h1></div>
        <div><h1>${wind} km/h</h1></div>
        <div><h1>${uv}</h1></div>`
    

        )
        $("#mycard").append(mycard)
        // to make for 5 day forecast
        // $(
        // `<div class="card">
        // <div class="card-body">
        // <h5 class="card-title red">${date}</h5>
        // <div><img src="${iconUrl}" alt="weather icon"></div>`
        // )
        // $("#mycard").append(my5card)
    })}
   

    // tempVal.textContent= cityData.current.temp + " °C"
    // windVal.textContent= cityData.current.wind_speed + " KM/H" 
    // humidVal.textContent= cityData.current.humidity + " %"
    // uviVal.textContent= cityData.current.uvi
    
{/* <li class="city">
  <h2 class="city-name" data-name="...">
    <span>...</span>
    <sup>...</sup>
  </h2>
  <span class="city-temp">...<sup>°C</sup></span>
  <figure>
    <img class="city-icon" src="..." alt="...">
    <figcaption>...</figcaption>
  </figure>
</li> */}

