import axios from 'axios';
import baseUrl from '.';

/**
 * Function creating an empty bundle
 * @param {object} data
 * @returns
 */
const createBundle = (data) => {
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

/**
 * Function getting info from a fagot by his id
 * @param {number} id
 * @returns
 */

export const getInfoBundleById = (id) => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/fagots/info/${id}`);
};

/**
 * Function service updating id_fagot about boxes
 * @param {array} boxesToAdd
 * @param {number} id
 */
export const updateBundleById = (boxesToAdd, id) => {
  return axios({
    method: 'put',
    data: boxesToAdd,
    url: `${baseUrl}/api/gereTesCaisses/fagots/boxes-to-bundle/${id}`
  });
};

/**
 * Function removing one boxe from a fagot
 * @param {number} id
 * @returns
 */
export const removeBoxeFromBundle = (id) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/api/gereTesCaisses/fagots/remove-to-bundle/${id}`
  });
};

export default createBundle;
