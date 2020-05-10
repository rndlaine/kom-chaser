import axios from 'axios';

export default {
  getCurrentWind: async (lat, lon) => {
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.GATSBY_WEATHER_API_KEY}`);

    const { wind } = result.data;
    return { ...wind, speed: wind.speed * 3.6 };
  },
  getCoordinates: async city => {
    const result = await axios.get(`https://geocode.xyz/${city}?json=1`);

    return { lat: result.data.latt, lon: result.data.longt };
  },
};
