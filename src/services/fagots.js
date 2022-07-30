import axios from 'axios';
const baseUrl = 'http://localhost:3001';

const getFagots = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/fagots`).then((result) => result);
};

export default getFagots;
