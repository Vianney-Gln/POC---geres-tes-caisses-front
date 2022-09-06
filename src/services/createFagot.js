import axios from 'axios';
import baseUrl from './'; // base url

const createFagot = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/gereTesCaisses/fagots`,
    data: data
  });
};

export default createFagot;
