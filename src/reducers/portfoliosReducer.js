import {LOAD_PORTFOLIO_DATA, LOAD_PORTFOLIO_SUMMARY_DATA, LOAD_PORTFOLIO_TOTAL_RETURNS_DATA,LOADING_PORTFOLIO_DATA} from '../actions/types';

const INITIAL_STATE = {
    portfolios: [],
    sameDayPortfolios:[],
    totalInterest:0,
    totalCapital:0,
    expectedReturns:0,
    loading:false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_PORTFOLIO_DATA:
            return {
                ...state,
                portfolios:action.payload.portfolios,
                sameDayPortfolios:action.payload.sameDayPortfolios,
            }
        case LOADING_PORTFOLIO_DATA:
            return {
                ...state,
                loading:action.payload.loading
            }
        case LOAD_PORTFOLIO_SUMMARY_DATA:
            return {
                ...state,
                totalCapital:action.payload.totalCapital,
                totalInterest:action.payload.totalInterest
            }
        case LOAD_PORTFOLIO_TOTAL_RETURNS_DATA:
            return {
                ...state,
                expectedReturns:action.payload.expectedReturns,
            }
        default:
            return state
    }
}