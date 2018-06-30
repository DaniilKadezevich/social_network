import formReducer from './formReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import dataReducer from './dataReducer'
import loadingReducer from './loadingReducer'
import postReducer from './postReducer'
import changePasswordReducer from './changePasswordReducer'

import { combineReducers } from 'redux';

let reducer = combineReducers({
    form: formReducer,
    notification: notificationReducer,
    user: userReducer,
    data: dataReducer,
    loading: loadingReducer,
    post: postReducer,
    password: changePasswordReducer,
});

export default reducer