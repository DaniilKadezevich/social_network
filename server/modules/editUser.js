const connectToTheDB = require('./connectToTheDB');
const {checkToken} = require('./jwt');
const { ObjectId } = require('mongodb');
const regFormValidation = require('./formValidation');
const getUser = require('./getUser');
const { sendErrorMessage } = require('./functions');
const i18n = require("i18n");

module.exports = function(token, user, res) {
    if (!regFormValidation(user)) {
        sendErrorMessage(i18n.__('Invalid data'), res);
        return;
    }

    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage(i18n.__('Invalid token'), res);
            return;
        }

        let query = { _id: ObjectId(data._id) };

        connectToTheDB(function (dbo, db) {
            let usersColl = dbo.collection('users');
            usersColl.findOne(query, function (err, result) {
               if (!result) {
                   sendErrorMessage(i18n.__('Can\'t find user.'), res);
                   db.close();
                   return;
               }

               if (user.email === result.email) {
                   usersColl.updateOne(query, {$set: user}, (err, r) => {
                       getUser(query, res, i18n.__('You have successfully edited your profile'));
                   });
               } else {
                   usersColl.findOne({email: user.email}, function (err, result) {
                       if (result) {
                           sendErrorMessage(i18n.__('User with this email is already registered'), res);
                           db.close();
                           return;
                       }

                       usersColl.updateOne(query, {$set: user}, (err, r) => {
                           getUser(query, res, i18n.__('You have successfully edited your profile'));
                       });
                   });
               }
            });
        });
    });
};