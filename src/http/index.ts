import axios from 'axios';

const index = axios.create({
  baseURL: 'https://639ced7742e3ad69273eb7de.mockapi.io',
  timeout: 2000,
});

export default index;
