import {ACTION_TYPES, preDelay, REGEXPS, URLS} from './constants';
import fetch from 'cross-fetch';

export function validateFormInputs(form) {
    let {gender, name, surname, middleName, email, age, photo} = form;
    let isFormValid = (
        REGEXPS.name.test(name.value) &&
        REGEXPS.surname.test(surname.value) &&
        (REGEXPS.middleName.test(middleName.value) || !middleName.value) &&
        REGEXPS.email.test(email.value) &&
        REGEXPS.age.test(age.value) &&
        gender.value &&
        photo.file
    );
    return isFormValid;
}
export function validateLogInFormInputs(form) {
    let {password, email} = form;
    let isFormValid = (
        REGEXPS.email.test(email.value) &&
        REGEXPS.password.test(password.value)
    );
    return isFormValid;
}
export function errorHandler(dispatch, message, finish = true) {
    setTimeout(() => {
        if (finish) {
            dispatch({type: ACTION_TYPES.FINISH_LOADING});
        }

        if (message) {
            dispatch({
                type: ACTION_TYPES.SHOW_NOTIFICATION,
                style: 'danger',
                message,
                isTemporary: true,
            });
        }
    }, preDelay);
}

export function successHandler(dispatch, message, isTemporary = true) {
    setTimeout(() => {
        dispatch({type: ACTION_TYPES.FINISH_LOADING});

        if (message) {
            dispatch({
                type: ACTION_TYPES.SHOW_NOTIFICATION,
                style: 'success',
                message,
                isTemporary,
            });
        }
    }, preDelay);
}

export function getToken() {
    let token = localStorage.getItem('token');

    return !token ? false : token;
}

export function makeRequest(url, method, headers = {}, body) {
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers,
        });
    }
    return fetch(url, {
        method,
        headers,
        body,
    });

}

export function makeRequestWithToken(url, method, headers = {}, body) {
    let token = getToken();

    if (!token) {
        return dispatch => {

        }
    }

    headers = {
        'Authorization': `Bearer ${token}`,
        ...headers,
    };

    return makeRequest(url, method, headers, body);
}