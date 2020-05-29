export const login = (payload) => {
    return {
        type: 'LOGIN_USER',
        payload
    };
};

export const register = (payload) => {
    return {
        type: 'REGISTER_USER',
        payload
    };
};

export const authenticate = (user) => {
    return {
        type: 'AUTHENTICATE',
        user
    };
};

export const attemptFailed = () => {
    return {
        type: 'FAIL'
    };
};