
const inputform = document.querySelector(".inputform");
const cityinput=document.querySelector(".cityinput");
const container=document.getElementsByClassName("container")[0];
const apikey="39a61d04278158415e49b86ec288dbe1";
inputform.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityinput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter the city");
    }
});


async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("Could not find weather data");
    }
    return await response.json();
}
function displayWeatherInfo(data){
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;

    container.textContent="";
    container.style.display="flex";

    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent= getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    container.appendChild(cityDisplay);
    container.appendChild(tempDisplay);
    container.appendChild(humidityDisplay);
    container.appendChild(descDisplay);
    container.appendChild(weatherEmoji);
}
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >=200 && weatherId < 300): 
                return '⛈️';
                break;
        case (weatherId >=300 && weatherId <400):
                return '🌧️';
                break;
        case (weatherId >=500 && weatherId <600):
                return '☔';
                break;
        case (weatherId >=600 && weatherId < 700):
                return '❄️';
                break;
        case (weatherId >=700 && weatherId <800): 
                return '🌫️';
                break;
        case (weatherId === 800) :
                return '☀️';
                break;
        case (weatherId>=801 && weatherId <=810):
                return '☁️'
                break;
        default :return '❓';
    }
}
function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.style.color="black";
    errorDisplay.classList.add("errorDisplay");
    container.textContent="";
    container.style.display="flex";
    container.appendChild(errorDisplay);
}

