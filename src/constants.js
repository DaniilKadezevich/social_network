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
};

export const preDelay = 1000;