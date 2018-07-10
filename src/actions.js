import fetch from 'cross-fetch';
import { I18n } from 'react-redux-i18n';
import { REGEXPS, ACTION_TYPES, URLS } from "./constants";
import {errorHandler, successHandler, getToken, makeRequest, makeRequestWithToken} from "./functions";
import moment from "moment/moment";

export function signUp(obj) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return makeRequest(URLS.SIGN_UP, 'POST', {}, obj)
            .then(response => response.json())
            .then(data => {
                if (data.isError){
                    errorHandler(dispatch, data.message);

                    return;
                }

                dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                localStorage.setItem('token', data.token);

                dispatch({type: ACTION_TYPES.CLEAR_FORM});

                successHandler(dispatch, data.message, false);
            })
    }
}

export function logIn(obj) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return makeRequest(URLS.LOG_IN, 'POST', {}, obj)
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message);

                    return;
                }

                dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                localStorage.setItem('token', data.token);

                dispatch({type: ACTION_TYPES.CLEAR_FORM});

                successHandler(dispatch, `${data.message}, ${data.user.name}`);
            });
    }
}

export function editUser(obj) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return makeRequestWithToken(URLS.EDIT_USER, 'POST', {}, obj)
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message);

                    return;
                }

                dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                dispatch({type: ACTION_TYPES.CLEAR_FORM});

                successHandler(dispatch, data.message);

            });
    }
}
export function getUserByToken() {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return makeRequestWithToken(URLS.GET_USER_BY_TOKEN, 'GET')
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch);
                    return;
                }

                dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                successHandler(dispatch);
            });
    }
}

export function getUsers(index, regexp = /.*/, url) {
    return dispatch => {
        let serialized = regexp.source;

        return makeRequestWithToken(
            url,
            'POST',
            { 'Content-Type': 'application/json', },
            JSON.stringify({ index, regexp: serialized })
        )
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }

                dispatch({type: ACTION_TYPES.ADD_USERS, users: data.users, stopLoad: data.isAll});
            });
    }
}

export function addFriend(obj) {
    return dispatch => {
        return makeRequestWithToken(
            URLS.ADD_FRIEND,
            'POST',
            { 'Content-Type': 'application/json', },
            JSON.stringify(obj)
        )
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }

                dispatch({type: ACTION_TYPES.LOAD_USER_INFO, user: data.user});
            });
    }
}

export function removeFriend(obj) {
    return dispatch => {
        return makeRequestWithToken(
            URLS.REMOVE_FRIEND,
            'POST',
            { 'Content-Type': 'application/json', },
            JSON.stringify(obj)
        )
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }

                dispatch({type: ACTION_TYPES.LOAD_USER_INFO, user: data.user});
            });
    }
}

export function uploadUser(obj) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return makeRequestWithToken(
            URLS.UPLOAD_USER,
            'POST',
            { 'Content-Type': 'application/json', },
            JSON.stringify(obj)
        )
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message);

                    return;
                }

                dispatch({type: ACTION_TYPES.LOAD_USER_INFO, user: data.user});

                successHandler(dispatch);
            });
    }
}
export function addPost(text, images) {
    let formData = new FormData();

    formData.append('text', text);
    formData.append('date', moment());

    if ( images.length) {
        images.forEach((img) => {
            formData.append('images', img);
        });
    } else {
        formData.append('images', '');
    }
    return dispatch => {
        return makeRequestWithToken(
            URLS.ADD_POST,
            'POST',
            {},
            formData
        )
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }

                dispatch({type: ACTION_TYPES.CLEAR_POST_FIELDS});
                dispatch({type: ACTION_TYPES.ADD_POST, post: [data.post]});
            });
    }
}
export function getAllPosts(index) {
    return dispatch => {
        return makeRequestWithToken(
            URLS.GET_ALL_POSTS,
            'POST',
            { 'Content-Type': 'application/json', },
            JSON.stringify({index})
        )
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);
                    return;
                }
                dispatch({type: ACTION_TYPES.LOAD_POSTS, posts: data.posts, stopLoad: data.isAll});
            });
    }
}
export function getUsersPosts(index, _id) {
    return dispatch => {
        return makeRequestWithToken(
            URLS.GET_USERS_POSTS,
            'POST',
            { 'Content-Type': 'application/json', },
            JSON.stringify({
                _id,
                index,
            })
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);
                    return;
                }

                dispatch({type: ACTION_TYPES.LOAD_POSTS, posts: data.posts, stopLoad: data.isAll});
            });
    }
}
export function deletePost(obj) {
    return dispatch => {
        return makeRequestWithToken(
            URLS.DELETE_POST,
            'POST',
            { 'Content-Type': 'application/json', },
            JSON.stringify(obj)
        )
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }
                dispatch({type: ACTION_TYPES.DELETE_POST, _id: data._id});
            });
    }
}

export function changePassword(oldP, newP, confirmP) {
    let formData = new FormData();
    formData.append('old', oldP);
    formData.append('new', newP);
    formData.append('confirm', confirmP);

    return dispatch => {
        return makeRequestWithToken(
            URLS.CHANGE_PASSWORD,
            'POST',
            {},
            formData
        )
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    dispatch({
                        type: ACTION_TYPES.SHOW_NOTIFICATION,
                        style: 'danger',
                        message: data.message,
                        isTemporary: true,
                    });

                    return;
                }
                dispatch({
                    type: ACTION_TYPES.SHOW_NOTIFICATION,
                    style: 'success',
                    message: data.message,
                    isTemporary: true,
                });
                dispatch({type: ACTION_TYPES.CLEAR_PASSWORD_INPUTS});
            });
    }
}

export function changeLocale(locale) {
    return dispatch => {
        return makeRequestWithToken(
            URLS.CHANGE_LOCALE,
            'POST',
            { 'Content-Type': 'application/json', },
            JSON.stringify({locale})
        )
    }
}


export function fillFormFields(user) {
    let { name, surname, middleName, email, gender, photo, age } = user;

    return dispatch => {
        dispatch({type: ACTION_TYPES.CLEAR_FORM});
        dispatch({type: ACTION_TYPES.ADD_NAME, value: name});
        dispatch({type: ACTION_TYPES.ADD_SURNAME, value: surname});
        dispatch({type: ACTION_TYPES.ADD_MIDDLE_NAME, value: middleName});
        dispatch({type: ACTION_TYPES.ADD_EMAIL, value: email});
        dispatch({type: ACTION_TYPES.ADD_AGE, value: age});
        dispatch({type: ACTION_TYPES.ADD_GENDER, gender});
        dispatch({type: ACTION_TYPES.ADD_PHOTO, file: photo});
        dispatch({type: ACTION_TYPES.VALIDATE_GENDER, status: 'waiting'});
        dispatch({type: ACTION_TYPES.VALIDATE_PHOTO, status: 'waiting'});
    }
}
export function setInvalidFields(form) {
    let { gender, name, surname, middleName, email, age, photo } = form;

    return dispatch => {
        dispatch({type: ACTION_TYPES.VALIDATE_NAME, status: REGEXPS.name.test(name.value), error: I18n.t('application.form.errors.required')});
        dispatch({type: ACTION_TYPES.VALIDATE_SURNAME, status: REGEXPS.surname.test(surname.value), error: I18n.t('application.form.errors.required')});
        dispatch({type: ACTION_TYPES.VALIDATE_MIDDLE_NAME, status: REGEXPS.middleName.test(middleName.value) || !middleName.value, error: I18n.t('application.form.errors.middleNameErr')});
        dispatch({type: ACTION_TYPES.VALIDATE_EMAIL, status: REGEXPS.email.test(email.value), error: I18n.t('application.form.errors.emailError')});
        dispatch({type: ACTION_TYPES.VALIDATE_AGE, status: REGEXPS.age.test(age.value), error: I18n.t('application.form.errors.ageError')});
        dispatch({type: ACTION_TYPES.VALIDATE_GENDER, status: gender.value, error: I18n.t('application.form.errors.required')});
        dispatch({type: ACTION_TYPES.VALIDATE_PHOTO, status: photo.file, error: I18n.t('application.form.errors.required')});
    }
}