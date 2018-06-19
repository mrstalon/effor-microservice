import axios from 'axios';

const HTTP = axios.create({
    baseURL: 'http://192.168.1.39:8090/api/teacher/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default HTTP;
