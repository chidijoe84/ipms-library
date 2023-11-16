import axios from 'axios';

//const baseUrl = axios("")// baseurl: 10.0.5.51:3012/api/v1

// axios.defaults.baseURL= "http://10.0.5.51:3012/api/v1"
// axios.defaults.baseURL= "http://197.210.166.58:3000/api/v1"
axios.defaults.baseURL = 'https://ipms.intellims.com:5300/api/v1';

export default axios;
