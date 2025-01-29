import axios from 'axios';

const keyID = import.meta.env.VITE_API_KEY_WEATHER;
const URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${keyID}`;

async function get(country) {
  try {
    const response = await axios.get(`${URL}&q=${country}&units=metric`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default {
  get,
};
