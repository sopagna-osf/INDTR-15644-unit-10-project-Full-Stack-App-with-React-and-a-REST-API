import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
let options = {
  baseURL: 'http://localhost:5000/api'
};

if (user) {
  options.headers = {
    Authorization: 'Basic ' + user.authToken
  };
}

const api = axios.create(options);

export default api;
