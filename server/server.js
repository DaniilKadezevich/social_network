const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: '../images/'});

const verifyToken = require('./modules/middlewares/jwtMiddleware');
const addUser = require('./modules/addUser');
const editUser = require('./modules/editUser');
const getUsers = require('./modules/getUsers');
const getUserByToken = require('./modules/getUserByToken');
const logIn = require('./modules/logIn');
const addToFriends = require('./modules/addToFriends');

app.use(bodyParser.json());

//Registration
app.post('/sign-up', upload.single('photo'), (req, res) => {
    let userObj = req.body;

    userObj.email = userObj.email.toLowerCase();

    addUser(userObj, res);
});

// Log in
app.post('/log-in', upload.single('photo'), (req, res) => {
    let userInfo = req.body;

    userInfo.email = userInfo.email.toLowerCase();

    logIn(userInfo, res);
});

// Edit user
app.post('/edit-user', verifyToken, upload.single('photo'), (req, res) => {
    let token = req.token;

    req.body.email = req.body.email.toLowerCase();

    editUser(token, req.body, res);
});

// Add to friends
app.post('/add-to-friends', verifyToken, (req, res) => {
    let token = req.token;
    let _id = req.body._id;

    addToFriends(token, _id, res);
});
// Load data
app.post('/get-users', verifyToken, (req, res) => {
    let token = req.token;
    let regexp = new RegExp(req.body.regexp, 'i');

    getUsers(token, regexp, res);
});

// TOKEN
app.get('/get-user-by-token', verifyToken, (req, res) => {
    getUserByToken(req.token, res);
});

// Server
app.listen(5000, function () {

});