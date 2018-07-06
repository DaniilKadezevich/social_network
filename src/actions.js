import fetch from 'cross-fetch';
import { I18n } from 'react-redux-i18n';
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

                successHandler(dispatch, data.message, false);
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

                successHandler(dispatch, `${data.message}, ${data.user.name}`);
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

                successHandler(dispatch, data.message);

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

export function getUsers(index, regexp = /.*/, url) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        let serialized = regexp.source;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                index,
                regexp: serialized
            })
        })
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
    formData.append('date', moment());

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
                dispatch({type: ACTION_TYPES.ADD_POST, post: [data.post]});
            });
    }
}
export function getAllPosts(index) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }
    return dispatch => {
        return fetch(URLS.GET_ALL_POSTS, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({index})
        })
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
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        return fetch(URLS.GET_USERS_POSTS, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id,
                index,
            })
        })
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

export function changePassword(oldP, newP, confirmP) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    let formData = new FormData();
    formData.append('old', oldP);
    formData.append('new', newP);
    formData.append('confirm', confirmP);

    return dispatch => {
        return fetch(URLS.CHANGE_PASSWORD, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
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
        return fetch(URLS.CHANGE_LOCALE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({locale}),
        })
    }
}

export function addGalleryImages(images) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    let formData = new FormData();

    images.forEach((img) => {
        formData.append('images', img);
    });

    return dispatch => {
        return fetch(URLS.ADD_GALLERY_IMAGES, {
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
                dispatch({type: ACTION_TYPES.ADD_GALLERY_IMAGES, images: data.images})
            });
    }
}
export function getGalleryImages(index) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }
    return dispatch => {
        return fetch(URLS.GET_GALLERY_IMAGES, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({index})
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);
                    return;
                }

                dispatch({type: ACTION_TYPES.LOAD_GALLERY_IMAGES, images: data.images, stopLoad: data.isAll})
            });
    }
}
export function removeGalleryImage(index) {
    let token = localStorage.getItem('token');

    if (!token) {
        return dispatch => {

        }
    }

    return dispatch => {
        return fetch(URLS.REMOVE_GALLERY_IMAGE, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({index})
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    errorHandler(dispatch, data.message, false);
                    return;
                }
                dispatch({type: ACTION_TYPES.REMOVE_GALLERY_IMAGE, index: data.index})
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
        dispatch({type: ACTION_TYPES.VALIDATE_NAME, status: REGEXPS.name.test(name.value), error: I18n.t('application.form.errors.required')});
        dispatch({type: ACTION_TYPES.VALIDATE_SURNAME, status: REGEXPS.surname.test(surname.value), error: I18n.t('application.form.errors.required')});
        dispatch({type: ACTION_TYPES.VALIDATE_MIDDLE_NAME, status: REGEXPS.middleName.test(middleName.value) || !middleName.value, error: I18n.t('application.form.errors.middleNameErr')});
        dispatch({type: ACTION_TYPES.VALIDATE_EMAIL, status: REGEXPS.email.test(email.value), error: I18n.t('application.form.errors.emailError')});
        dispatch({type: ACTION_TYPES.VALIDATE_AGE, status: REGEXPS.age.test(age.value), error: I18n.t('application.form.errors.ageError')});
        dispatch({type: ACTION_TYPES.VALIDATE_GENDER, status: gender.value, error: I18n.t('application.form.errors.required')});
        dispatch({type: ACTION_TYPES.VALIDATE_PHOTO, status: photo.file, error: I18n.t('application.form.errors.required')});
    }
}