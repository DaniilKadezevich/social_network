import { createStore } from 'redux';
import basicReducer from './reducers/reducer';

const store = createStore(basicReducer);

export default store;