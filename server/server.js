let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// let multer = require('multer');
// let upload = multer();

let generatePassword = require('./modules/generatePassword');
let regFormValidation = require('./modules/regFormValidation');

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";


app.use(bodyParser.json());

app.post('/post-info-test', (req, res) => {
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
                    let user = {...req.body, password};

                    dbo.collection("users").insertOne(user, function(err, res) {
                        if (err) throw err;
                        db.close();
                    });
                    let response = {
                        user,
                        isError: false,
                    };
                    res.send(response);
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

app.listen(5000, function () {

});