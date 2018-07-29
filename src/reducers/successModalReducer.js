import {SHOW_SUCCESS_MODAL, HIDE_SUCCESS_MODAL} from '../actions/types';

const initialState = {
  showModal: false,
  data:{
    type:'',
    data:{
      amount:'',
      from:'',
      to:''
    }
  }
}

const successModalReducer = (state = initialState, action) => {
  switch (action.type){
    case SHOW_SUCCESS_MODAL:
      return {
        showModal:true,
        data:{...action.payload}
      }
    case HIDE_SUCCESS_MODAL:
      return {
        ...state,
        showModal:false
      }
    default:
      return state;
  }


}

export default successModalReducer;