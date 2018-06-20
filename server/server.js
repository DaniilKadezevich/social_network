const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: '../images/'});
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const bcrypt = require('bcrypt');
const config = require('./config.json');
const jwt = require('jsonwebtoken');

let generatePassword = require('./modules/generatePassword');
let regFormValidation = require('./modules/regFormValidation');




app.use(bodyParser.json());

app.post('/sign-up', upload.single('photo'), (req, res) => {
    let userObj = req.body;

    userObj.email = userObj.email.toLowerCase();

    if (!regFormValidation(userObj)) {

        let response = {
            message: 'Invalid data',
            isError: true,
        };

        res.send(response);
        return;
    }

    let password = generatePassword();

    connectToTheDB(function(dbo, db) {
        let query = {email: userObj.email};

        dbo.collection("users").findOne(query, function (err, result) {
            if (result) {
                let response = {
                    message: 'User with this email is already registered',
                    isError: true
                };

                res.send(response);
                db.close();
                return;
            }

            bcrypt.hash(password, 10, function(err, hash) {
                dbo.collection("users").insertOne({...userObj, password: hash}, function(err, result) {
                    if (err) throw err;

                    //
                    let token = jwt.sign({ email: result.ops[0].email}, config.secret);
                    //

                    let user = {...userObj, password};
                    let response = {
                        user,
                        isError: false,
                        token
                    };
                    res.send(response);
                    db.close();
                });
            });
        });
    });
});

app.post('/log-in', (req, res) => {
    let userInfo = req.body;

    userInfo.email = userInfo.email.toLowerCase();

    connectToTheDB(function(dbo, db) {
        let query = {email: userInfo.email};

        dbo.collection('users').findOne(query, (err, result) => {
            if (!result) {
                let response = {
                    message: 'There is no users with this email',
                    isError: true,
                };
                res.send(response);
                db.close();
                return;
            }

            bcrypt.compare(userInfo.password, result.password, function(err, valid) {
                if (!valid) {
                    let response = {
                        message: 'Invalid password',
                        isError: true,
                    };

                    res.send(response);
                    db.close();
                    return;
                }
                let token = jwt.sign({ email: result.email }, config.secret);

                let response = {
                    user: {...result, password: undefined},
                    isError: false,
                    token
                };

                res.send(response);
                db.close();

            });
        });
    });
});

// CONNECT TO THE DB
function connectToTheDB(callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo= db.db('social_network');
        callback(dbo, db);
    });
}

// TOKEN
app.get('/check-token', verifyToken, (req, res) => {
    jwt.verify(req.token, config.secret, (error, data) => {
        if (error) {
            res.send({
                isValid: false,
            });
            return;
        }

        connectToTheDB(function (dbo, db) {
            let query = {email: data.email};

            dbo.collection('users').findOne(query, (err, result) => {
                if (!result) {
                    res.send({
                        isValid: false,
                    });
                    db.close();
                    return
                }

                res.send({
                    user: {...result, password: undefined},
                    isValid: true,
                });
            })
        });

    });
});

//Verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    } else {
        res.send({
            isValid: false,
        });
    }
}

// Server
app.listen(5000, function () {

});