import formReducer from './regFormReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import loadingReducer from './loadingReducer'

import { combineReducers } from 'redux';

let reducer = combineReducers({
    form: formReducer,
    notification: notificationReducer,
    user: userReducer,
    loading: loadingReducer,
});

export default reducer