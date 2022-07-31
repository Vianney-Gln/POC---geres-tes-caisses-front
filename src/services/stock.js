import axios from 'axios';

const baseUrl = 'http://localhost:3001';

/**
 * Function getting stock vrac
 * @returns {promise}
 */
const getStockVrac = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/vrac`).then((result) => result);
};

/**
 * Function getting stock total
 * @returns {promise}
 */
export const getStockTotal = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/total`).then((result) => result);
};

/**
 * Function getting fagots
 * @returns {promise}
 */
export const getFagots = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/fagots`).then((result) => result);
};

export const getBoxeByFagot = (id) => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/fagots/${id}`).then((result) => result);
};

export default getStockVrac;
