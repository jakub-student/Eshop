/* 
    převzato z následujících zdrojů:
    part 9 - https://www.youtube.com/watch?v=USaB1adUHM0
    part 10 - https://www.youtube.com/watch?v=qyomEaXQJFk
    part 11 - https://www.youtube.com/watch?v=de5gkk_40Eo
    part 12 - https://www.youtube.com/watch?v=Efwp65XF0bM
*/

const initState = {
    token: localStorage.getItem('MyUniqueLoginToken'),
    isAuthenticated: null,
    user: null
};

const authReducer = (state = initState, action ) => {
    switch(action.type) {
        case 'AUTHENTICATE':
            console.log('authentication');
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            };
        case 'REGISTER_USER':
        case 'LOGIN_USER':
            localStorage.setItem('MyUniqueLoginToken', action.payload.token);
            return {
                ...state,
                ...action.user,
                isAuthenticated: true
            };
        case 'FAIL':
            localStorage.removeItem('MyUniqueLoginToken');
            console.log('fail');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
}

export default authReducer;