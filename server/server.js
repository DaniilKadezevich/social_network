const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: '../images/'});
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const bcrypt = require('bcrypt');

let generatePassword = require('./modules/generatePassword');
let regFormValidation = require('./modules/regFormValidation');




app.use(bodyParser.json());

app.post('/sing-up', upload.single('photo'), (req, res) => {
    let userObj = req.body;

    userObj.email = userObj.email.toLowerCase();

    if (regFormValidation(userObj)) {
        let password = generatePassword();

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("social_network");
            let query = {email: userObj.email};

            dbo.collection("users").findOne(query, function (err, result) {
                if (result) {
                    db.close();

                    let response = {
                        message: 'User with this email is already registered',
                        isError: true
                    };

                    res.send(response);
                } else {
                    bcrypt.hash(password, 10, function(err, hash) {
                        dbo.collection("users").insertOne({...userObj, password: hash}, function(err, res) {
                            if (err) throw err;
                            db.close();
                        });
                        let user = {...userObj, password};
                        let response = {
                            user,
                            isError: false,
                        };
                        res.send(response);
                    });
                }
            });
        });
    } else {
        let response = {
            message: 'User with this email is already registered',
            isError: false,
        };
        res.send(response);
    }
});

app.post('/log-in', (req, res) => {
    let userInfo = req.body;

    userInfo.email = userInfo.email.toLowerCase();

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("social_network");
        let query = {email: userInfo.email};

        dbo.collection("users").findOne(query, (err, result) => {
            if (result) {
                bcrypt.compare(userInfo.password, result.password, function(err, valid) {
                    if (valid) {
                        db.close();

                        let response = {
                            user: result,
                            isError: false,
                        };

                        res.send(response);
                    } else {
                        db.close();

                        let response = {
                            message: 'Invalid password',
                            isError: true,
                        };

                        res.send(response);
                    }
                });
            } else {
                db.close();

                let response = {
                    message: 'There is no users with this email',
                    isError: true,
                };
                res.send(response);
            }
        });
    });

});

app.listen(5000, function () {

});