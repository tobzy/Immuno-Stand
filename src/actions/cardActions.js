import {axiosClient} from '../tools/axiosClient';
import {showInfoBox} from '../components/sharedComponents/infoBox/actions'
import {hideLoading,showLoading} from 'react-redux-loading-bar'
import {LOAD_CARDS_DATA} from './types';
import {logoutUser} from "./auth";
import {getCards, deleteCard} from '../config/url.js'
import {message} from 'antd'

export function loadCards(cards) {
  return {
    type:LOAD_CARDS_DATA,
    payload:cards
  }
}

export function getTheCards() {
  return  (dispatch)=> {
    dispatch(showLoading())
      // message.loading('Getting Cards', 1);
      axiosClient.get(getCards)
        .then((response) => {
          // if (response.data.success) {
          dispatch(loadCards(response.data.data));
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
          // message.info("Could not verify. Try again", 1);
        })

  }
}

export function addCard() {
    
}

export function deleteACard(cardId, callback = console.log) {
    return (dispatch) => {
        message.loading('Deleting Card', 1);

        axiosClient.delete(deleteCard(cardId))
            .then((response) => {
                if (response.data.success) {
                    callback()
                    dispatch(getTheCards())
                }
                message.info("Card was deleted successfully", 1)
            })
            .catch((error) => {
                if (error.response) {
                    message.error(error.response.data.message, 3)
                } else {
                    message.error(error.message,3)
                }
            })
    }
}
