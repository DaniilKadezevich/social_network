import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/reducer';
import { loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';
import { TRANSLATIONS_OBJECT } from "./constants";
import {changeLocale} from "./actions";


const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
    )
);
syncTranslationWithStore(store);
store.dispatch(loadTranslations(TRANSLATIONS_OBJECT));
let locale = localStorage.getItem('locale');
if (!locale) {
    locale = 'en';
}
store.dispatch(changeLocale(locale));
store.dispatch(setLocale(locale));

store.subscribe(() => {
    console.log(store.getState());
});

export default store;