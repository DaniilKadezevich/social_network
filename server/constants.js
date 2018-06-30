const REGEXPS = {
    name: /^[A-Za-z]{1,32}$/,
    surname: /^[A-Za-z]{1,32}$/,
    middleName: /^[A-Za-z]{1,32}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    age: /^[1-9][0-9]?$/,
};

module.exports.REGEXPS = REGEXPS;

const URLS = {
    SIGN_UP: '/sign_up',
    LOG_IN: '/log-in',
    EDIT_USER: '/edit-user',
    ADD_FRIEND: '/add-friend',
    REMOVE_FRIEND: '/remove-friend',
    GET_FRIENDS: '/get-friends',
    GET_USERS: '/get-users',
    UPLOAD_USER: '/upload-user',
    GET_USER_BY_TOKEN: '/get-user-by-token',
    ADD_POST: '/add-post',
    GET_ALL_POSTS: '/get-all-posts',
    DELETE_POST: '/delete-post',
    CHANGE_PASSWORD: '/change-password',
};

module.exports.URLS = URLS;