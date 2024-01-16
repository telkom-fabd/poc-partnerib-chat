import Cookies from 'js-cookie'

const saveToken = (token) => {
    Cookies.set('tokenMerchant', token, {expires: 1});
}

const getToken = () => {
    return Cookies.get('tokenMerchant');
}

const saveUser = (user) => {
    Cookies.set('userMerchant', JSON.stringify(user), {expires: 1});
}

const getUser = () => {
    const user = Cookies.get('userMerchant');
    return JSON.parse(user);
}

const destroyCookies = () => {
    Cookies.remove('tokenMerchant');
    Cookies.remove('userMerchant');
}

export {
    saveToken,
    getToken,
    saveUser,
    getUser,
    destroyCookies
}
