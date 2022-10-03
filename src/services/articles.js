import axios from 'axios';
import baseUrl from './';

/**
 * Function getting articles from api ( articles mean differents kind of boxes)
 * @returns
 */
const getArticles = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/articles`);
};

export default getArticles;
