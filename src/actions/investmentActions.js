import {axiosClient} from '../tools/axiosClient';
import {showInfoBox} from '../components/sharedComponents/infoBox/actions'
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {logoutUser} from "./auth";
import {LOAD_INVESTMENTS_DATA, SET_ACTIVE_INVESTMENT, RESET_ACTIVE_INVESTMENT} from './types'

import {getInvestments} from '../config/url';

export function getTheInvestments(pageNumber = 1, pageSize = 4, search = '', filterBy) {
    let params = {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
        search: search
    }
    if (filterBy) {
        params.filter = filterBy
    }
    return (dispatch) => {
        dispatch(showLoading())
        // dispatch(showInfoBox('Getting Available Investments','notice', 3000))
        axiosClient.get(getInvestments, {
            params
        })
            .then(response => {
                if (response.data.success === true) {
                    dispatch(loadInvestments(response.data))

                } else {
                    dispatch(showInfoBox('Error. Could not retrieve investments', 'error', 3000))
                }
                dispatch(hideLoading())
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(logoutUser());
                        dispatch(showInfoBox("Login Token has expired, please log in again", 'error', 3000))
                        return;
                    }
                    dispatch(showInfoBox(error.response.data.message, 'error', 3000))
                } else {
                    dispatch(showInfoBox(error.message, 'error', 3000))
                }
                dispatch(hideLoading())
            });
    }
}

export function loadInvestments(investments) {
    return {
        type: LOAD_INVESTMENTS_DATA,
        payload: investments
    }
}

export function setActiveInvestment(number, callback) {
    callback()
    return {
        type: SET_ACTIVE_INVESTMENT,
        payload: number
    }
}

export function resetActiveInvestment(number) {
    return {
        type: RESET_ACTIVE_INVESTMENT,
        payload: number
    }
}