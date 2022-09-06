import axios from 'axios';
import baseUrl from './'; // base url

/**
 * Function creating an empty fagot
 * @param {object} data
 * @returns
 */
const createFagot = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/gereTesCaisses/fagots`,
    data: data
  });
};

export default createFagot;
