import axios from 'axios';
import baseUrl from '.'; // base url

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

/**
 * Function deleting one fagot by his id
 * @param {number} id
 * @returns
 */
export const deleteFagotById = (id) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/api/gereTesCaisses/fagots/${id}`
  });
};

export default createFagot;
