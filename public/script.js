// Getting elements
const searchInput = document.getElementById("location");
const searchBtn = document.querySelector(".search_icon");
const tempEle = document.querySelector(".current_temp");
const humidityEle = document.querySelector(".current_humidity");
const windEle = document.querySelector(".current_speed");
const cityEle = document.querySelector(".current_location");
const weatherImageEle = document.querySelector(".weather_image");


// Creating Functions
async function searchLocation() {
    console.log(searchInput.value);
    const city = searchInput.value;
    if (searchInput.value == "") {
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7f619bfdd3f26c9997dd7ada01838e6`
    await fetch(url).then(response => response.json()).then(data => {
        // const result = data.main;
        tempEle.textContent = (data.main.temp / 10).toFixed(1) + "°C";
        humidityEle.textContent = data.main.humidity + "%";
        windEle.textContent = (data.wind.speed).toFixed(1) + " km/hr";
        cityEle.textContent = data.name;
        if (data.weather[0].main == "Clouds") {
            weatherImageEle.src = "./images/clouds.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherImageEle.src = "./images/rain.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherImageEle.src = "./images/clear.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherImageEle.src = "./images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherImageEle.src = "./images/mist.png"
        }

    }).catch(err => {
        cityEle.textContent = "City Not Found"
        console.log(err)
    }
    )
    searchInput.value = ""

}

// Calling Functions
searchBtn.addEventListener("click", searchLocation)
searchInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        searchLocation()
    }
})