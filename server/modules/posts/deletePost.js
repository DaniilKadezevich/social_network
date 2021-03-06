const connectToTheDB = require('../connectToTheDB');
const {checkToken} = require('../jwt');
const { ObjectId } = require('mongodb');
const { sendErrorMessage } = require('../functions');


module.exports = function (token, post_id, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token' ,res);
            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('posts').deleteOne({ _id: ObjectId(post_id) }, (err, result) => {
                if (err) {
                    sendErrorMessage('Can\'t delete post.' ,res);
                    db.close();
                    return;
                }

                res.send({
                    _id: post_id,
                    isError: false,
                });
                db.close();
            });

        });
    });
};