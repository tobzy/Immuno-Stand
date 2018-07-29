import {axiosClient} from '../tools/axiosClient.js';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {postLogin, getUser} from '../config/url';
import {showInfoBox} from '../components/sharedComponents/infoBox/actions';
import {history} from '../App.js'
import {
    AUTH_USER,
    UNAUTH_USER,
    SHOW_RESEND_CONFIRMATION_EMAIL,
    HIDE_RESEND_CONFIRMATION_EMAIL,
    LOAD_ACTIVE_STARTUP_DATA,
    REMOVE_ACTIVE_STARTUP_DATA
} from './types';


export function authUser(user) {
    return {
        type: AUTH_USER,
        payload: user
    }
}

export function logoutUser() {
    return function (dispatch) {
        window.sessionStorage.removeItem('hackathon_api_user');

        dispatch({type: UNAUTH_USER})
        history.push("/")
        // dispatch(showInfoBox('You just logged out', 'success', 3000))
    }
}