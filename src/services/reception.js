import axios from 'axios';
import baseUrl from './';

const validateReception = (reception) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/gereTesCaisses/receptions`,
    data: reception
  });
};

export default validateReception;
