import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const getStockVrac = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/vrac`).then((result) => result);
};

export default getStockVrac;
