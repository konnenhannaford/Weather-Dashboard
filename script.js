

var locationEl = document.querySelector("#location");
var tempVal = document.querySelector("#temp");
var humidVal = document.querySelector("#humid");
var windspVal = document.querySelector("#windsp");
var uviVal = document.querySelector("#uvi");
async function getWeatherData() {
    var fivedayforecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationEl.value}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    console.log(fivedayforecast)
    var oneCall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayforecast.city.coord.lat}&lon=${fivedayforecast.city.coord.lon}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    console.log(oneCall)
    // var uvIndex = 
    tempVal.textContent= oneCall.current.temp + " *Cel"
    // tempVal.textContent= oneCall.current.temp 
    // tempVal.textContent= oneCall.current.temp
    // tempVal.textContent= oneCall.current.temp
}
locationEl.addEventListener("keydown", function(event){
    if (event.keyCode === 13){
        getWeatherData();
    }
})

const form = document.querySelector(".top-banner form");

form.addEventListener("submit", e => {
  e.preventDefault();

    alert()

  const inputVal = input.value;
});





async function fetchdata(){
    var input = document.querySelector(".city").value;
    var link  = "https://api.openweathermap.org/data/2.5/weather?q="+input+"&appid=f91eaf46e0bf96dd19136475c9928ef1";

    fetch(link, {//options => (optional)
        method: 'get' //Get / POST / ...
    }).then((res) => {
         console.log(res.json());
    })
    


}


data fetch
run loop to show