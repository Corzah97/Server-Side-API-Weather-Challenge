
(function( $ ){
    let apikey ="1c9670cdaf4ee0f2e2693880fa0ca6d1"


   console.log("firiing jQurey")

 function fetchOneday(city) {
    let apiString=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

    fetch(apiString)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        displayOneday(data)
        fetchFiveday(data.coord.lat,data.coord.lon)
    })
}
    
function fetchFiveday(lat,lon) {
    let apiString=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`

    fetch(apiString)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        displayFiveday(data.list)
    })
}

 $("#search-button").on("click",function(event){
    event.preventDefault()
    let searchvalue=$("#city-input").val()
    console.log(searchvalue)
    fetchOneday(searchvalue)
 })

function displayOneday(data){
    let cityName=$("<h4>")
    cityName.addClass("card-title").text(data.name)
    let cityInfo=$("<div>")
    cityInfo.html(`<p>Temp: ${data.main.temp} <p>Humidity: ${data.main.humidity} <p>Wind Speed: ${data.wind.speed}`)

    
    $("#main-body").append(cityName).append(cityInfo)

}

function displayFiveday(data){
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.dt_txt.includes("06:00:00")){

        
        let card=$("<div>")
        card.addClass("card")
        let cityInfo=$("<div>")
        cityInfo.addClass("card-body")
     cityInfo.html(`<p class="lead">${dayjs(element.dt_txt).format("ddd,D MMM YYYY")}</p> <p>Temp: ${element.main.temp} <p>Humidity: ${element.main.humidity} <p>Wind Speed: ${element.wind.speed}`)
    card.append(cityInfo)
    $("#five-days-display").append(card)
}
}
    

}

 })( jQuery );

