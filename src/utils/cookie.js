import Cookies from 'js-cookie'

const saveToken = (token) => {
    Cookies.set('token', token, {expires: 1});
}

const getToken = () => {
    return Cookies.get('token');
}

const removeToken = () => {
    Cookies.remove('token');
}

export {
    saveToken,
    getToken,
    removeToken
}
