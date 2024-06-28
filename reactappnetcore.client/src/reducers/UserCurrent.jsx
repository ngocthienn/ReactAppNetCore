import { post } from "./requests";

const apiUrl = import.meta.env.VITE_API_URL;

export const RegisterStatus = {
    NOT_REGISTERED: 'NOT_REGISTERED',
    REGISTRATION_SUCCESSFUL: 'REGISTRATION_SUCCESSFUL',
    REGISTRATION_FAILED: 'REGISTRATION_FAILED',
}

export const LoginStatus = {
    NOT_LOGGED_IN: 'NOT_LOGGED_IN',
    LOGIN_SUCCESSFUL: 'LOGIN_SUCCESSFUL',
    LOGIN_FAILED: 'LOGIN_FAILED',
}

export const CHANGE_REGISTRATION_STATUS = 'CHANGE_REGISTRATION_STATUS';
export const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS';
export const LOGIN_APP = 'LOGIN_APP';

// action
// export const registerApp = registerData => {
//     post(`${apiUrl}/Users/Register`, registerData).then(res => {
//         return {
//             type: CHANGE_REGISTRATION_STATUS,
//             payload: RegisterStatus.REGISTRATION_SUCCESSFUL
//         };
//     }).catch(err => {
//         console.log("registerApp", err.message);
//         return {
//             type: CHANGE_REGISTRATION_STATUS,
//             payload: RegisterStatus.REGISTRATION_FAILED
//         };
//     })
// };

export const registerApp = registerData => (dispatch) => {
    post(`${apiUrl}/Users/Register`, registerData).then(res => {
        dispatch({
            type: CHANGE_REGISTRATION_STATUS,
            payload: RegisterStatus.REGISTRATION_SUCCESSFUL
        });
    }).catch(err => {
        console.log("registerApp", err.message);
        dispatch({
            type: CHANGE_REGISTRATION_STATUS,
            payload: RegisterStatus.REGISTRATION_FAILED
        })
    })
};

export const loginApp = loginData => (dispatch) => {
    post(`${apiUrl}/Users/Login`, loginData).then(res => {
        dispatch({
            type: LOGIN_APP,
            payload: {
                loginStatus : LoginStatus.LOGIN_SUCCESSFUL,
                userLogin : res.data
            }
        });
    }).catch(err => {
        console.log("loginApp", err.message);
        dispatch({
            type: LOGIN_APP,
            payload: {
                loginStatus : LoginStatus.LOGIN_FAILED,
                userLogin : null
            }
        });
    })
}

export const changeLoginStatus = loginStatus => ({
    type: CHANGE_LOGIN_STATUS,
    loginStatus
})

export const changeRegistrationStatus = registerStatus => ({
    type: CHANGE_REGISTRATION_STATUS,
    registerStatus
})

// reducer
export default function reducer(state = {
    registerStatus: RegisterStatus.NOT_REGISTERED,
    loginStatus : LoginStatus.NOT_LOGGED_IN,
    userLogin : null,
}, action) {
    switch (action.type) {
        case CHANGE_REGISTRATION_STATUS:
            return {
                ...state,
                registerStatus: action.payload
            };

        case CHANGE_LOGIN_STATUS:
            return {
                ...state,
                loginStatus: action.payload
            };

        case LOGIN_APP:
            return {
                ...state,
                loginStatus: action.payload.loginStatus,
                userLogin : action.payload.userLogin
            };

        default:
            break;
    }
    return state;
}