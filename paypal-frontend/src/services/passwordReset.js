import axios from 'axios';

const baseUrl = 'https://paypal-back.herokuapp.com/api/password-reset';  //'http://localhost:3001/api/password-reset'; 

const passwordReset = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};


const passwordResetService = { passwordReset };
export default passwordResetService;