import {LOAD_BANKS_DATA} from '../actions/types';

const INITIAL_STATE = {data: []}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_BANKS_DATA:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}