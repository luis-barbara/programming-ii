const fs = require('node:fs')
const API_KEY = '97efa7cee60a55ce9a3151e56c2f3570'; // Replace with a valid key  
const CITIES = ['London', 'Paris', 'Tokyo']; 


async function fetchCityWeather(city) {  
    try {  
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);  
      if (!response.ok) throw new Error(`Failed to fetch data from ${city}`);
      const data = await response.json();
      return {
        city: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity
    };
    } catch (error) {  
      console.error(error.message);  
    }  
  }

  async function fetchCities() {  
    const promises = CITIES.map(city => fetchCityWeather(city));  
    const weatherData = await Promise.all(promises);
    fs.writeFileSync("session7_data.json", JSON.stringify(weatherData, null, 2));  
    console.log(weatherData);  
  }  


fetchCities();




