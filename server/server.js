const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: '../images/'});

const verifyToken = require('./modules/middlewares/jwtMiddleware');
const addUser = require('./modules/addUser');
const getUserByToken = require('./modules/getUserByToken');
const getUserByPassword = require('./modules/getUserByPassword');

app.use(bodyParser.json());

//Registration
app.post('/sign-up', upload.single('photo'), (req, res) => {
    let userObj = req.body;

    userObj.email = userObj.email.toLowerCase();

    addUser(userObj, res);
});

// Log in
app.post('/log-in', (req, res) => {
    let userInfo = req.body;

    userInfo.email = userInfo.email.toLowerCase();

    getUserByPassword(userInfo, res);
});

// TOKEN
app.get('/check-token', verifyToken, (req, res) => {
    getUserByToken(req.token, res);
});

// Server
app.listen(5000, function () {

});