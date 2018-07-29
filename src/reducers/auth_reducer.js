import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    message: '',
    user: {},
    authenticated: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                error: '',
                user: {...action.payload},
                authenticated: true
            };
        case UNAUTH_USER:
            return {
                ...state,
                authenticated: false
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            };
    }

    return state;
}