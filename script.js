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
        <div><p id="uviIndex">UVI Index: ${uvi} </p></div>`
        )
        $("#mycard").append(mycard)


        var mycard2 = ""
        
        for (let i=1; i < 6; i++){
          
          

            // cityname = response1.name;
           
            var humidity3 = response2.daily[i]['humidity'];
            var temp3 = response2.daily[i].temp['day'];
            var wind3 = response2.daily[i].wind;
            var iconUrl3 = response2.daily[i].weather[0]['icon'];
            //var date3 = response2.daily[i]['date'];

              iconUrl3 = "https://openweathermap.org/img/wn/" + iconUrl3 + "@2x.png"
            //  temp = response2.current.temp;     
            //  humidity = response2.current.humidity;
            //  wind = response2.current.wind_speed;
            //  uvi = response2.current.uvi;

         




        mycard2 += 
        
        `<div class="col-2" >
        <div class="card">
        <div class="card-body">
        <h1 class="card-title red"></h1>
        <div><img src="${iconUrl3 }"alt="weather icon"></div>
        <div><p>Temp: ${temp3} °C</p></div>     
        <div><p>Humidity: ${humidity3 } %</p></div>
        <div><p>Wind Speed: ${wind3} km/h</p></div></div></div></div>`;
    
          } 

          $("#mycard2").append(mycard2)

        })})}

// . then(response=>{
 
    
    // 5 day forecast
    
    
//   })
//   })
//   }        
          
          // to make uv index
{/* <div>
<span id="uvi" class="uv-index py-1 px-2 rounded-md"></span>
</div> 
var currentClass;

function uvcolours () {
if (currentClass) uviVal.classList.remove(currentClass);

if (uvi <= 2) {
uviVal.classList.add("bg-green-300");
currentClass = "bg-green-300";
} else if (uvi <= 5) {
uviVal.classList.add("bg-yellow-300");
currentClass = "bg-yellow-300";
} else if (uvi <= 7) {
uviVal.classList.add("bg-yellow-600");
currentClass = "bg-yellow-600";
} else if (uvi <= 10) {
uviVal.classList.add("bg-red-500");
currentClass = "bg-red-500";
} else {
uviVal.classList.add("bg-red-700");
currentClass = "bg-red-700";
}} */}