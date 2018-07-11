const {checkToken} = require('../jwt');
const connectToTheDB = require('../connectToTheDB');
const { ObjectId } = require('mongodb');
const { sendErrorMessage } = require('../functions');

module.exports = function(token, index, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        connectToTheDB(function (dbo, db) {
            let element = {};
            element[`gallery.${index}`] = null;
            dbo.collection('users').update({ _id: ObjectId(data._id) }, { $set: element }, (err, r) => {
                dbo.collection('users').update({ _id: ObjectId(data._id) }, { $pull: {'gallery': null} }, (e, result) => {
                    res.send({
                        index,
                        isError: false
                    });
                    db.close();
                });
            });

        });
    });
};