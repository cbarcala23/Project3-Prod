import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        const instance = axios.create({
            headers: {'x-auth-token': token}
          });
          return instance;
        // axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // delete axios.defaults.headers.common['x-auth-token'];
        return axios;
    }

};

export default setAuthToken;