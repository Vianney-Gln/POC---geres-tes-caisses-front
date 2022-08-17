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
 * @param {number} idArticleCount
 * @returns {promise}
 */
export const getCountVrac = (idArticleCount) => {
  if (idArticleCount) {
    return axios
      .get(`${baseUrl}/api/gereTesCaisses/vrac/count/?article=${idArticleCount}`)
      .then((result) => result.data);
  } else {
    return axios.get(`${baseUrl}/api/gereTesCaisses/vrac/count`).then((result) => result.data);
  }
};

/**
 * Function counting boxes in total stock
 * @param {number} idArticleCount
 * @returns {promise}
 */
export const getCountTotal = (idArticleCount) => {
  if (idArticleCount) {
    return axios
      .get(`${baseUrl}/api/gereTesCaisses/total/count/?article=${idArticleCount}`)
      .then((result) => result.data);
  } else {
    return axios.get(`${baseUrl}/api/gereTesCaisses/total/count`).then((result) => result.data);
  }
};

/**
 * Function counting fagots
 *  @param {number} idArticleCount
 * @returns {promise}
 */
export const getCountFagot = (idArticleCount) => {
  if (idArticleCount) {
    return axios
      .get(`${baseUrl}/api/gereTesCaisses/fagots/count/?article=${idArticleCount}`)
      .then((result) => result.data);
  } else {
    return axios.get(`${baseUrl}/api/gereTesCaisses/fagots/count`).then((result) => result.data);
  }
};

/**
 * Function deleting all selected rows from the stock
 * @param {array} ids
 */
export const outOfStock = (ids) => {
  console.log(ids);
};

export default getStockVrac;
