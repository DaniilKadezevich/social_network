export const REGEXPS = {
    name: /^[A-Za-z]{1,32}$/,
    surname: /^[A-Za-z]{1,32}$/,
    middleName: /^[A-Za-z]{1,32}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    age: /^[1-9][0-9]?$/,
    password: /^[a-zA-Z0-9_\-]{10,}$/,
};

export const ACTION_TYPES = {
    START_LOADING: 'START_LOADING',
    FINISH_LOADING: 'FINISH_LOADING',
    SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
    AUTHORIZE: 'AUTHORIZE',
    CLEAR_FORM: 'CLEAR_FORM',
    LOAD_USER_INFO: 'LOAD_USER_INFO',
    ADD_USERS: 'ADD_USERS',
    ADD_NAME: 'ADD_NAME',
    ADD_SURNAME: 'ADD_SURNAME',
    ADD_MIDDLE_NAME: 'ADD_MIDDLE_NAME',
    ADD_EMAIL: 'ADD_EMAIL',
    ADD_AGE: 'ADD_AGE',
    ADD_GENDER: 'ADD_GENDER',
    ADD_PHOTO: 'ADD_PHOTO',
    VALIDATE_NAME: 'VALIDATE_NAME',
    VALIDATE_SURNAME: 'VALIDATE_SURNAME',
    VALIDATE_MIDDLE_NAME: 'VALIDATE_MIDDLE_NAME',
    VALIDATE_EMAIL: 'VALIDATE_EMAIL',
    VALIDATE_AGE: 'VALIDATE_AGE',
    VALIDATE_GENDER: 'VALIDATE_GENDER',
    VALIDATE_PHOTO: 'VALIDATE_PHOTO',
};

export const URLS = {
    SIGN_UP: '/sign_up',
    LOG_IN: '/log-in',
    EDIT_USER: '/edit-user',
    ADD_FRIEND: '/add-friend',
    REMOVE_FRIEND: '/remove-friend',
    GET_FRIENDS: '/get-friends',
    GET_USERS: '/get-users',
    UPLOAD_USER: '/upload-user',
    GET_USER_BY_TOKEN: '/get-user-by-token',
};

export const preDelay = 1000;