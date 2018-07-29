import {axiosClient} from '../tools/axiosClient';
import {showInfoBox} from '../components/sharedComponents/infoBox/actions'
import {hideLoading,showLoading} from 'react-redux-loading-bar'
import {logoutUser} from "./auth";
import {LOAD_PORTFOLIO_DATA,LOAD_PORTFOLIO_SUMMARY_DATA,LOAD_PORTFOLIO_TOTAL_RETURNS_DATA,LOADING_PORTFOLIO_DATA} from './types';
 import {getPortfolioForUser, getInvestmentDetails, getInvestmentReport} from '../config/url.js'

export function loadPortfolios(portfolios, sameDayPortfolios) {
  return {
    type:LOAD_PORTFOLIO_DATA,
    payload:{
        portfolios,
        sameDayPortfolios
    }
  }
}
export function loadingPortfolios(status) {
    return {
        type:LOADING_PORTFOLIO_DATA,
        payload:{
           loading:status
        }
    }
}

export function loadPortfolioTotalSummary(totalCapital, totalInterest) {
    return {
        type:LOAD_PORTFOLIO_SUMMARY_DATA,
        payload:{
            totalCapital,
            totalInterest
        }
    }
}

export  function loadPortfolioTotalReturns(expectedReturns) {
    return {
        type:LOAD_PORTFOLIO_TOTAL_RETURNS_DATA,
        payload:{
            expectedReturns
        }
    }
}
function calculateSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}



export function getThePortfolios(userId) {
  return  (dispatch)=> {
      dispatch(showLoading())
      dispatch(loadingPortfolios(true))
      axiosClient.get(getPortfolioForUser(userId))
          .then(response => {
              if (response.data.success === true) {
                  let todaysPortfolios = response.data.portfolio.filter((portfolio) => {
                      return calculateSameDay(new Date(portfolio.createdAt), new Date())
                  })

                  dispatch(loadPortfolios(response.data.portfolio, todaysPortfolios))
                  return axiosClient.get(getInvestmentDetails(userId))
              } else {
                  throw new Error(response.data.message)
              }
          })
          .then(response => {
              if (response.data.success === true) {
                  dispatch(loadPortfolioTotalSummary(response.data.totalCapital, response.data.totalInterest))
                  return axiosClient.get(getInvestmentReport(userId))
              } else {
                  throw new Error(response.data.message)
              }
          })
          .then(response => {
              if (response.data.success === true) {
                  dispatch(loadPortfolioTotalReturns(response.data.expectedReturns))
                  dispatch(hideLoading())
              } else {
                  throw new Error(response.data.message)
              }
              dispatch(loadingPortfolios(false))
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
              dispatch(loadingPortfolios(false))
          });

  }
}

