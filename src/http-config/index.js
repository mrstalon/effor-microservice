import axios from 'axios';

const HTTP = axios.create({
    baseURL: 'http://192.168.1.39:8090/teacher/api/',
    withCredentials: true,
});

export default HTTP;
