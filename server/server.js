const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({limits: { fieldSize: 25 * 1024 * 1024 }});
const i18n = require("i18n");
i18n.configure({
    locales:['ru', 'en', 'ukr'],
    defaultLocale: 'ru',
    directory: __dirname + '/locales',
});
const { URLS } = require('./constants');

const verifyToken = require('./modules/middlewares/jwtMiddleware');
const signUp = require('./modules/auth/signUp');
const editUser = require('./modules/editUser');
const uploadUser = require('./modules/friends/uploadUser');
const getAllUsers = require('./modules/getAllUsers');
const getFriends = require('./modules/friends/getFriends');
const getUserByToken = require('./modules/auth/getUserByToken');
const logIn = require('./modules/auth/logIn');
const addFriend = require('./modules/friends/addFriend');
const addPost = require('./modules/posts/addPost');
const deletePost = require('./modules/posts/deletePost');
const getAllPosts = require('./modules/posts/getAllPosts');
const getUsersPosts = require('./modules/posts/getUsersPosts');
const removeFriend = require('./modules/friends/removeFriend');
const changePassword = require('./modules/changePassword');

app.use(bodyParser.json());
app.use(i18n.init);
// Locale
app.post(URLS.CHANGE_LOCALE, (req, res) => {
    i18n.setLocale(req.body.locale);
    res.send({
        isError: false,
        message: 'Locale set',
    })
});
//Registration
app.post(URLS.SIGN_UP, upload.single('photo'), (req, res) => {
    let userObj = req.body;

    userObj.email = userObj.email.toLowerCase();

    signUp(userObj, res);
});

// Log in
app.post(URLS.LOG_IN, upload.single('photo'), (req, res) => {
    let userInfo = req.body;

    userInfo.email = userInfo.email.toLowerCase();

    logIn(userInfo, res);
});

// Edit user
app.post(URLS.EDIT_USER, verifyToken, upload.single('photo'), (req, res) => {
    let token = req.token;

    req.body.email = req.body.email.toLowerCase();

    editUser(token, req.body, res);
});
// Posts
app.post(URLS.ADD_POST, verifyToken, upload.any(), (req, res) => {
    let token = req.token;
    let postInfo = req.body;

    addPost(token, postInfo, res)
});
app.post(URLS.GET_ALL_POSTS, verifyToken, (req, res) => {
    let token = req.token;

    getAllPosts(token, req.body.index,res)
});
app.post(URLS.GET_USERS_POSTS, verifyToken, (req, res) => {
    let token = req.token;

    getUsersPosts(token, req.body.index, res, req.body._id)
});
app.post(URLS.DELETE_POST, verifyToken, (req, res) => {
    let token = req.token;

   deletePost(token, req.body._id, res);
});
// Friends actions
app.post(URLS.ADD_FRIEND, verifyToken, (req, res) => {
    let token = req.token;
    let _id = req.body._id;

    addFriend(token, _id, res);
});
app.post(URLS.REMOVE_FRIEND, verifyToken, (req, res) => {
    let token = req.token;
    let _id = req.body._id;

    removeFriend(token, _id, res)
});
app.post(URLS.GET_FRIENDS, verifyToken, (req, res) => {
    let token = req.token;
    let regexp = new RegExp(req.body.regexp, 'i');

    getFriends(token, res, req.body.index, regexp);
});
// Load data
app.post(URLS.GET_USERS, verifyToken, (req, res) => {
    let token = req.token;
    let regexp = new RegExp(req.body.regexp, 'i');

    getAllUsers(token, regexp, res, req.body.index);
});
app.post(URLS.UPLOAD_USER, verifyToken, (req, res) => {
    let token = req.token;
    let _id = req.body._id;

    uploadUser(token, _id, res);
});
// TOKEN
app.get(URLS.GET_USER_BY_TOKEN, verifyToken, (req, res) => {
    getUserByToken(req.token, res);
});
// Password
app.post(URLS.CHANGE_PASSWORD, verifyToken, upload.any(), (req, res) => {
    let token = req.token;

    changePassword(token, req.body, res);
});
// Server
app.listen(5555, function () {

});