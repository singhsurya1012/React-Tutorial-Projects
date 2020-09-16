import * as actionTypes from './actionTypes'
import axios from 'axios'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId

    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = (expiration) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiration*1000);
    }
}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvLCchUErMpPOo969wBDRzKXaAwX51NhI';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvLCchUErMpPOo969wBDRzKXaAwX51NhI'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })
    }
}

