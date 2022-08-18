import axios from 'axios';

const validateReception = (reception) => {
  return axios({
    method: 'post',
    url: 'http://localhost:3001/api/gereTesCaisses/receptions',
    data: reception
  });
};

export default validateReception;
