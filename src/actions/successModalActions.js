import {SHOW_SUCCESS_MODAL, HIDE_SUCCESS_MODAL} from './types'

import {axiosClient} from '../tools/axiosClient';
import {showInfoBox} from '../components/sharedComponents/infoBox/actions'
import {hideLoading, showLoading} from 'react-redux-loading-bar'

import {postTransferFunds} from '../config/url';
export const showSuccessModal = (type) => {
  return {
    type: SHOW_SUCCESS_MODAL,
    payload: type
  }
}
export const hideSuccessModal = () => {
  return {
    type: HIDE_SUCCESS_MODAL
  }
}

export const transferFunds = (prevInvestmentId,newInvestmentId,userId ) => {
  return (dispatch) => {
    dispatch(showLoading())
    // dispatch(showInfoBox('Getting Available Investments','notice', 3000))
    let params = {
      prevInvestmentId,
      newInvestmentId,
      userId
    }
    axiosClient.post(postTransferFunds, params)
      .then(response => {
        if (response.data.success === true) {
          // dispatch(loadInvestments(response.data.investments))
          dispatch(showInfoBox(response.data.message, 'success', 3000))
          dispatch(hideSuccessModal())

        } else {
          dispatch(showInfoBox(response.data.message, 'error', 3000))
        }
        dispatch(hideLoading())
      })
      .catch((error) => {
        if (error.response) {
          dispatch(showInfoBox(error.response.data.message, 'error', 3000));
        } else {
          dispatch(showInfoBox(error.message, 'error', 3000))
        }
        dispatch(hideLoading())
      });
  }
}