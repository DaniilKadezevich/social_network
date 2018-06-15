import formReducer from './regFormReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'

import { combineReducers } from 'redux';

let reducer = combineReducers({
    form: formReducer,
    notification: notificationReducer,
    user: userReducer,
});

export default reducer