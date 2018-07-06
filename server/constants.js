const REGEXPS = {
    name: /^[A-Za-z]{1,32}$/,
    surname: /^[A-Za-z]{1,32}$/,
    middleName: /^[A-Za-z]{1,32}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    age: /^[1-9][0-9]?$/,
};

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
    CHANGE_LOCALE: '/change-locale',
    GET_USERS_POSTS: '/get-users-posts',
    ADD_GALLERY_IMAGES: '/add-gallery-images',
    GET_GALLERY_IMAGES: '/get-gallery-images',
    REMOVE_GALLERY_IMAGE: '/remove-gallery-image',
};

const MIN_PASSWORD_LENGTH = 10;
const SALT = 10;

module.exports.REGEXPS = REGEXPS;
module.exports.URLS = URLS;
module.exports.MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH;
module.exports.SALT = SALT;