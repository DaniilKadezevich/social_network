const connectToTheDB = require('../connectToTheDB');
const {checkToken} = require('../jwt');
const { ObjectId } = require('mongodb');


module.exports = function (token, post_id, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                message: 'Invalid token',
                isError: true,
            });

            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('posts').deleteOne({ _id: ObjectId(post_id) }, (err, result) => {
                if (err) {
                    res.send({
                        message: 'Error',
                        isError: true,
                    });

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