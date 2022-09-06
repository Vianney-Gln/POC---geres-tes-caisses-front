import axios from 'axios';
import baseUrl from './'; // base url

const getArticles = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/articles`);
};

export default getArticles;
