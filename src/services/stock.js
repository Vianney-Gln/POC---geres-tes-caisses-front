import axios from 'axios';
import baseUrl from './';

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
 * Function getting stock total - can be sorted by length (article)
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
 * Function getting bundles
 * @returns {promise}
 */
export const getBundles = (idArticle) => {
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
export const getBoxesByBundle = (id) => {
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
  return axios({
    method: 'delete',
    url: `${baseUrl}/api/gereTesCaisses/outOfStock`,
    data: ids
  });
};

/**
 * Function getting the number of boxes in a fagot
 * @param {number} idFagot
 * @returns {promise}
 */
export const getCountBoxesByFagot = (idFagot) => {
  return axios
    .get(`${baseUrl}/api/gereTesCaisses/fagots/number-box-in-fagots/${idFagot}`)
    .then((result) => result.data);
};

export default getStockVrac;
