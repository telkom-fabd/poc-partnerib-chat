import axios from 'axios';
import * as cookie from '../utils/cookie';

const API_URL = import.meta.env.VITE_API_URL;

const getMerchant = async () => {
    try {
        const user = cookie.getUser();
        const url = `${API_URL}/api/v1/merchants/${user._id}`;
        const headers = {
            Authorization: `Bearer ${cookie.getToken()}`,
        }

        const response = await axios.get(url, {headers});
        if (response.data.data) {
            return {
                isSuccess: true,
                data: response.data.data,
            };
        } else {
            return {
                isSuccess: false,
                message: 'Failed to get merchant',
            };
        }
    } catch (err) {
        return {
            isSuccess: false,
            message: err.response.data.message,
        };
    }
}

const getSendBirdUser = async () => {
    try {
        const user = cookie.getUser();
        const url = `${API_URL}/api/v1/merchants/${user._id}/sendbird-user`;
        const headers = {
            Authorization: `Bearer ${cookie.getToken()}`,
        }

        const response = await axios.get(url, {headers});
        if (response.data.data) {
            return {
                isSuccess: true,
                data: response.data.data,
            };
        } else {
            return {
                isSuccess: false,
                message: 'Failed to get sendbird user',
            };
        }
    } catch (err) {
        return {
            isSuccess: false,
            message: err.response.data.message,
        };
    }
}

export {
    getMerchant,
    getSendBirdUser,
};
