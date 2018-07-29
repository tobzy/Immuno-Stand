import {axiosClient} from '../tools/axiosClient';
import {showInfoBox} from '../components/sharedComponents/infoBox/actions'
import {hideLoading, showLoading} from 'react-redux-loading-bar'
import {LOAD_BANKS_DATA} from './types';
import {getBanks, postbanks, deleteBank} from '../config/url.js';
import {message} from 'antd';
import {logoutUser} from './auth'
import nubanValidator from '../components/pages/mainlayout/SubLayout/Dashboard/AddBank/nubanValidator.js'

export function loadBanks(banks) {
    return {
        type: LOAD_BANKS_DATA,
        payload: banks
    }
}

export function getTheBanks() {
    return (dispatch) => {
        dispatch(showLoading())
        // message.loading('Getting Cards', 1);
        axiosClient.get(getBanks)
            .then((response) => {
                // if (response.data.success) {
                dispatch(loadBanks(response.data.data));
                // }
                dispatch(hideLoading());
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
                dispatch(hideLoading());
            })

    }
}

export function addBank(bankCode, accountNumber, callback) {
    return (dispatch) => {
        message.loading('Validating account number', 0.3);
        let isAccountValid = nubanValidator(bankCode, accountNumber);

        if (!isAccountValid) {
            message.error('Invalid account number', 2)
            return;
        }
        message.loading('Adding Bank', 1);

        axiosClient.post(postbanks, {
            "accountNumber": accountNumber,
            "bankCode": bankCode
        }).then((response) => {
            if (response.data.success) {
                callback()
                dispatch(getTheBanks())
            }
            message.info("Bank was added successfully", 1)
        })
            .catch((error) => {
                message.info(error.response.data.message, 2)
            })
    }

}

export function deleteABank(bankId, callback = console.log) {
    return (dispatch) => {
        message.loading('Deleting Bank', 1);

        axiosClient.delete(deleteBank(bankId))
            .then((response) => {
            if (response.data.success) {
                callback()
                dispatch(getTheBanks())
            }
            message.info("Bank was deleted successfully", 1)
        })
            .catch((error) => {
                message.info(error.response.data.message, 2)
            })
    }
}
