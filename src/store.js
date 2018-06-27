import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/reducer';


const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

// store.subscribe(() => {
//     console.log(store.getState());
// });

export default store;