import regFormReducer from './regFormReducer'
import { combineReducers } from 'redux';

let reducer = combineReducers({
    regForm: regFormReducer,
});

export default reducer