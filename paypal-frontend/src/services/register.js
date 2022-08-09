import axios from 'axios';

const baseUrl =  'https://paypal-back.herokuapp.com/api/users'; //'http://localhost:3001/api/users';

const register = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};


const registerService = { register };
export default registerService;