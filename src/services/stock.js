import axios from 'axios';

const baseUrl = 'http://localhost:3001';

/**
 * Function getting stock vrac
 * @returns {promise}
 */
const getStockVrac = (idArticle) => {
  if (idArticle) {
    return axios
      .get(`${baseUrl}/api/gereTesCaisses/vrac/?article=${idArticle}`)
      .then((result) => result);
  }
  return axios.get(`${baseUrl}/api/gereTesCaisses/vrac`).then((result) => result);
};

/**
 * Function getting stock total - can be sorted by length
 * @returns {promise}
 */
export const getStockTotal = (idArticle) => {
  if (idArticle) {
    return axios
      .get(`${baseUrl}/api/gereTesCaisses/total/?article=${idArticle}`)
      .then((result) => result);
  }
  return axios.get(`${baseUrl}/api/gereTesCaisses/total`).then((result) => result);
};

/**
 * Function getting fagots
 * @returns {promise}
 */
export const getFagots = (idArticle) => {
  if (idArticle) {
    return axios
      .get(`${baseUrl}/api/gereTesCaisses/fagots/?article=${idArticle}`)
      .then((result) => result);
  }
  return axios.get(`${baseUrl}/api/gereTesCaisses/fagots`).then((result) => result);
};

/**
 * Function getting boxes by fagots id
 * @param {number} id
 * @returns {promise}
 */
export const getBoxeByFagot = (id) => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/fagots/${id}`).then((result) => result);
};

/**
 * Function counting boxes in vrac stock
 * @returns {promise}
 */
export const getCountVrac = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/vrac/count`).then((result) => result.data);
};

/**
 * Function counting boxes in total stock
 * @returns {promise}
 */
export const getCountTotal = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/total/count`).then((result) => result.data);
};

/**
 * Function counting fagots
 * @returns {promise}
 */
export const getCountFagot = () => {
  return axios.get(`${baseUrl}/api/gereTesCaisses/fagots/count`).then((result) => result.data);
};

export default getStockVrac;
