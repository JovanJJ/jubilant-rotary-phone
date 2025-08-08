const apiKey = '43fc470b393cd76f62775887d2d41dac';
const inputElement = document.querySelector('.cityInput');
const cart = document.querySelector('.cart');
const countryCode = 'RS';

const weatherForm = document.querySelector('.weatherForm');
weatherForm.addEventListener('submit', async event => {
  event.preventDefault();
  const city = inputElement.value;

  try{
    const data = await getData(city);
    weatherInfo(data);
  }
  catch(error){
    console.error(error);
  }
  

});


async function getData(city){
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  if(!response.ok){
    console.error("Could not fetch data");
  }
  const data = await response.json();
  return data;
}


 function weatherInfo(data){
  const {
    name: city,
    main: {temp, humidity},
    weather: [{id, description}]} = data;

  cart.textContent = "";  
    
  const cityDisplay = document.createElement("h1");
  const temperatureDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const weatherEmojiDisplay = document.createElement("p");
  const polutionDisplay = document.createElement('h2');
  const polutionEmojiDisplay = document.createElement("p");
  const polutionInfoDisplay = document.createElement("p");

  cityDisplay.textContent = (`${city}`);
  temperatureDisplay.textContent = (`${(temp - 273.15).toFixed(2)}°`);
  humidityDisplay.textContent = (`humidity ${humidity}%`);
  descriptionDisplay.textContent = (`${description}`);
  weatherEmojiDisplay.textContent = weatherEmoji(id);
  polutionDisplay.textContent = "Polution Info";
  polutionEmojiDisplay.textContent = ("😐");
  polutionInfoDisplay.textContent = ("mosty good");


  cityDisplay.classList.add('cityDisplay');
  temperatureDisplay.classList.add('temperatureDisplay');
  humidityDisplay.classList.add('humidityDisplay');
  descriptionDisplay.classList.add('descriptionDisplay');
  weatherEmojiDisplay.classList.add('emojiDisplay');
  polutionDisplay.classList.add('polutionInfo');
  polutionEmojiDisplay.classList.add("polutionEmoji");
  polutionInfoDisplay.classList.add("polutionDescription");

  cart.appendChild(cityDisplay); 
  cart.appendChild(temperatureDisplay); 
  cart.appendChild(humidityDisplay);
  cart.appendChild(descriptionDisplay);
  cart.appendChild(weatherEmojiDisplay);
  cart.appendChild(polutionDisplay);
  cart.appendChild(polutionEmojiDisplay);
  cart.appendChild(polutionInfoDisplay);
}

function weatherEmoji(weatherId){
  if(weatherId >= 200 && weatherId < 300){
    return "⛈️";
  } else if(weatherId >= 300 && weatherId < 400){
    return "🌧️";
  } else if(weatherId >= 500 && weatherId < 600){
    return "🌧️";
  } else if(weatherId >= 600 && weatherId < 700){
    return "❄️";
  } else if(weatherId >= 700 && weatherId < 800){
    return "🌫️";
  } else if(weatherId === 800){
      return "☀️";
  } else if(weatherId >= 801 && weatherId < 810){
    return "☁️";
  }
}

