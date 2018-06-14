import formReducer from './regFormReducer'
import { combineReducers } from 'redux';

let reducer = combineReducers({
    form: formReducer,
});

export default reducer