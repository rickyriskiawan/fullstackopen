import axios from 'axios';
const URL = 'http://localhost:3001/persons';

async function getAll() {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function create(newObject) {
  try {
    const response = await axios.post(URL, newObject);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function deletePerson(id) {
  try {
    const response = axios.delete(`${URL}/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

async function updatePerson(id, updatedObject) {
  try {
    const response = await axios.put(`${URL}/${id}`, updatedObject);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default {
  getAll,
  create,
  deletePerson,
  updatePerson,
};
