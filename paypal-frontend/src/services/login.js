import axios from 'axios';

const baseUrl = 'https://paypal-back.herokuapp.com/api/login'; //'http://localhost:3001/api/login';

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};


const loginService = { login };
export default loginService;