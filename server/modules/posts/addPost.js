const connectToTheDB = require('../connectToTheDB');
const {checkToken} = require('../jwt');
const { ObjectId } = require('mongodb');
const { sendErrorMessage } = require('../functions');


module.exports = function (token, postInfo, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        if (!Array.isArray(postInfo.images) && postInfo.images !== '') {
            postInfo.images = [postInfo.images];
        }

        if (postInfo.text.trim() === '' &&  postInfo.images === '') {
            sendErrorMessage('You can\'t add an empty post', res);
            return;
        }

        postInfo.text = postInfo.text.trim();

        connectToTheDB(function (dbo, db) {
            dbo.collection('posts').insertOne({...postInfo, author: data._id}, (err, result) => {
                if (err) {
                    sendErrorMessage('Can\'t add post', res);
                    db.close();
                    return;
                }

                dbo.collection('users').findOne({ _id: ObjectId(data._id) }, { fields: { name: 1, surname: 1, photo: 1}}, (er ,r) => {
                    if (!r) {
                        sendErrorMessage('Can\'t find user', res);
                        db.close();
                        return;
                    }

                    let post = {...result.ops[0], name: r.name, surname: r.surname, photo: r.photo};
                    res.send({
                        post,
                        isError: false,
                    });
                    db.close();

                });
            });

        });
    });
};