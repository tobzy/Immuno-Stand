import {
  LOAD_INVESTMENTS_DATA,
  SET_ACTIVE_INVESTMENT,
  RESET_ACTIVE_INVESTMENT
} from '../actions/types';

const INITIAL_STATE = {data:[],activeInvestment:-1, pagination:{}}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_INVESTMENTS_DATA:
      return {
        ...state,
        data:action.payload.investments,
        pagination:{...action.payload.pagination}
      }
    case SET_ACTIVE_INVESTMENT:
      let number;
      if(state.activeInvestment === action.payload){
        number = -1
      }else{
        number = action.payload
      }
      return {
        ...state,
        activeInvestment:number
      }

    case RESET_ACTIVE_INVESTMENT:
      return {
        ...state,
        activeInvestment:-1
      }
  }

  return state;
}