const connectToTheDB = require('./connectToTheDB');
const {checkToken} = require('./jwt');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { sendErrorMessage } = require('./functions');

module.exports = function (token, passwords, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        connectToTheDB((dbo, db) => {
            dbo.collection('users').findOne({ _id: ObjectId(data._id)}, { fields: {password: 1}}, (err, result) => {
                if (err) {
                    sendErrorMessage('Can\'t find user', res);
                    db.close();
                    return;
                }

                bcrypt.compare(passwords.old, result.password, function(err, valid) {
                    if (!valid) {
                        sendErrorMessage('Your old password was entered incorrectly.', res);
                        db.close();
                        return;
                    }

                    if (passwords.new === passwords.old) {
                        sendErrorMessage('Create a new password you haven\'t used before.', res);
                        db.close();
                        return;
                    }

                    if (passwords.new !== passwords.confirm) {
                        sendErrorMessage('The two password fields didn\'t match.', res);
                        db.close();
                        return;
                    }

                    if (passwords.new.length < 10) {
                        sendErrorMessage('Create a password at least 10 characters long.', res);
                        db.close();
                        return;
                    }

                    bcrypt.hash(passwords.new, 10, function(err, hash) {
                        dbo.collection('users').updateOne({ _id: ObjectId(data._id)}, {$set: { password: hash }}, (err, r) => {
                            if (err) {
                                sendErrorMessage('Can\'t update user', res);
                                db.close();
                                return;
                            }

                            res.send({
                                message: 'Password changed',
                                isError: false,
                            });
                            db.close();
                        })
                    });

                });
            })
        });
    });
};