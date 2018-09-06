import axios from 'axios';

const HTTP = axios.create({
    baseURL: 'http://192.168.1.38:8090/api/teacher/',
    // baseURL: 'https://temp1.effor.by/api/teacher/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus(status) {
        // 403 status code means that user is not authoraized.then(redirect user to login form)
        // 401 status code means that user has no rights to get or set info
        if (status === 403 || status === 401) {
            const urlToRedirect = 'https://temp1.effor.by/teacher/schoolsettings';
            window.location.replace(urlToRedirect);
        }
        return true;
    },
});

export default HTTP;
