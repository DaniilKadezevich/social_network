const connectToTheDB = require('./connectToTheDB');
const {checkToken} = require('./jwt');
const ObjectId = require('mongodb').ObjectId;
const regFormValidation = require('./regFormValidation');

module.exports = function(token, user, res) {
    if (!regFormValidation(user)) {

        let response = {
            message: 'Invalid data',
            isError: true,
        };

        res.send(response);
        return;
    }

    checkToken(token, (error, data) => {
        if (error) {
            let response = {
                message: 'Invalid token',
                isError: false,
            };

            res.send(response);

            return;
        }

        let query = { _id: ObjectId(data._id) };

        connectToTheDB(function (dbo, db) {
            let usersColl = dbo.collection('users');
            usersColl.findOne(query, function (err, result) {
               if (!result) {
                   let response = {
                       message: 'Error',
                       isError: true,
                   };

                   res.send(response);
                   db.close();

                   return;
               }

               if (user.email === result.email) {
                   usersColl.updateOne(query, {$set: user}, function (err, r) {

                       usersColl.findOne(query, function (err, result) {
                           if (!result) {
                               let response = {
                                   message: 'No user with this id',
                                   isError: true,
                               };

                               res.send(response);
                               db.close();

                               return;
                           }

                           let updatedUser = {...result, password: undefined};

                           res.send({
                               user: updatedUser,
                               isError: false,
                           });
                           db.close();
                       })
                   })
               } else {
                   usersColl.findOne({email: user.email}, function (err, result) {
                       if (result) {
                           let response = {
                               message: 'User with this email is already registered',
                               isError: true
                           };

                           res.send(response);
                           db.close();

                           return;
                       }
                       usersColl.updateOne(query, {$set: user}, function (err, r) {

                           usersColl.findOne(query, function (err, result) {
                               if (!result) {
                                   let response = {
                                       message: 'No user with this id',
                                       isError: true,
                                   };

                                   res.send(response);
                                   db.close();

                                   return;
                               }

                               let updatedUser = {...result, password: undefined};

                               res.send({
                                   user: updatedUser,
                                   isError: false,
                               });
                               db.close();
                           })
                       })
                   });
               }
            });

        });

    });
};