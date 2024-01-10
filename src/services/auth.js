import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const login = async (body) => {
    try {
        const url = `${API_URL}/api/v1/auth/login-merchant`;
        const response = await axios.post(url, body);
        if (response.data.data && response.data.data.access_token) {
            return {
                isSuccess: true,
                token: response.data.data.access_token,
            };
        } else {
            return {
                isSuccess: false,
                message: 'Invalid email or password',
            };
        }
    } catch (err) {
        return {
            isSuccess: false,
            message: err.response.data.message,
        };
    }
};

export {login};
