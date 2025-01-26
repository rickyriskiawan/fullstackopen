import axios from 'axios';

const URL = 'https://studies.cs.helsinki.fi/restcountries/api/all';

async function getAll() {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  getAll,
};
