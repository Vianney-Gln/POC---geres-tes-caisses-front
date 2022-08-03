import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const getArticles = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/articles`);
};

export default getArticles;
