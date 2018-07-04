import fetch from 'cross-fetch';
import { REGEXPS, ACTION_TYPES, URLS } from "./constants";
import { errorHandler, successHandler } from "./functions";
import moment from "moment/moment";

export function signUp(obj) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch(URLS.SIGN_UP, {
            method: "POST",
            body: obj
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError){
                    errorHandler(dispatch, data.message);

                    return;
                }

                dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                localStorage.setItem('token', data.token);

                dispatch({type: ACTION_TYPES.CLEAR_FORM});

                successHandler(dispatch, `You are successfully registered. Your password: ${data.user.password}`, false);
            })
    }
}

export function logIn(obj) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch(URLS.LOG_IN, {
            method: "POST",
            body: obj,
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message);

                    return;
                }

                dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                localStorage.setItem('token', data.token);

                dispatch({type: ACTION_TYPES.CLEAR_FORM});

                successHandler(dispatch, `Welcome back, ${data.user.name}`);
            });
    }
}

export function editUser(obj) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch(URLS.EDIT_USER, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },

            method: "POST",
            body: obj
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message);

                    return;
                }

                dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                dispatch({type: ACTION_TYPES.CLEAR_FORM});

                successHandler(dispatch, 'You have successfully edited your profile');

            });
    }
}
export function getUserByToken() {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch(URLS.GET_USER_BY_TOKEN, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
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

export function getUsers(regexp = /.*/) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        let serialized = regexp.source;

        return fetch(URLS.GET_USERS, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ regexp: serialized })
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }

                dispatch({type: ACTION_TYPES.ADD_USERS, users: data.users});
            });
    }
}

export function getFriends() {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        return fetch(URLS.GET_FRIENDS, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }

                dispatch({type: ACTION_TYPES.ADD_USERS, users: data.users});
            });
    }
}

export function addFriend(obj) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        return fetch(URLS.ADD_FRIEND, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
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
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        return fetch(URLS.REMOVE_FRIEND, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
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
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch(URLS.UPLOAD_USER, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
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
    formData.append('date', moment().format('MMMM Do YYYY, h:mm a'));

    if ( images.length) {
        images.forEach((img) => {
            formData.append('images', img);
        });
    } else {
        formData.append('images', '');
    }

    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        return fetch(URLS.ADD_POST, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }

                dispatch({type: ACTION_TYPES.CLEAR_POST_FIELDS});
                dispatch({type: ACTION_TYPES.LOAD_POSTS, posts: [data.post]});
            });
    }
}
export function getAllPosts() {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        return fetch(URLS.GET_ALL_POSTS, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);

                    return;
                }

                dispatch({type: ACTION_TYPES.REMOVE_POSTS});
                dispatch({type: ACTION_TYPES.LOAD_POSTS, posts: data.posts});
            });
    }
}
export function deletePost(obj) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        return fetch(URLS.DELETE_POST, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
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
        dispatch({type: ACTION_TYPES.VALIDATE_NAME, status: REGEXPS.name.test(name.value)});
        dispatch({type: ACTION_TYPES.VALIDATE_SURNAME, status: REGEXPS.surname.test(surname.value)});
        dispatch({type: ACTION_TYPES.VALIDATE_MIDDLE_NAME, status: REGEXPS.middleName.test(middleName.value) || !middleName.value});
        dispatch({type: ACTION_TYPES.VALIDATE_EMAIL, status: REGEXPS.email.test(email.value)});
        dispatch({type: ACTION_TYPES.VALIDATE_AGE, status: REGEXPS.age.test(age.value)});
        dispatch({type: ACTION_TYPES.VALIDATE_GENDER, status: gender.value});
        dispatch({type: ACTION_TYPES.VALIDATE_PHOTO, status: photo.file, error: 'No photo selected'});
    }
}