import {combineReducers} from 'redux';
import infoBoxReducer from './infoBoxReducer';
import investmentsReducer from './investmentsReducer';
import cardsReducer from './cardsReducer';
import banksReducer from './banksReducer';
import portfolioReducer from './portfoliosReducer';
import successModalReducer from './successModalReducer';
import {loadingBarReducer} from 'react-redux-loading-bar'
import authReducer from './auth_reducer';


const rootReducer = combineReducers({
    infoBox: infoBoxReducer,
    loadingBar: loadingBarReducer,
    auth: authReducer,
    investments: investmentsReducer,
    successModal: successModalReducer,
    cards: cardsReducer,
    banks: banksReducer,
    portfolio: portfolioReducer,
});

export default rootReducer;