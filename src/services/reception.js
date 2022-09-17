import axios from 'axios';
import baseUrl from './'; // base url

const validateReception = (reception) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/gereTesCaisses/receptions`,
    data: reception
  });
};

export default validateReception;
