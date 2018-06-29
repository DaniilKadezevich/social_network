const connectToTheDB = require('./connectToTheDB');
const {checkToken} = require('./jwt');
const { ObjectId } = require('mongodb');


module.exports = function (token, postInfo, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                message: 'Invalid token',
                isError: true,
            });

            return;
        }

        if (!Array.isArray(postInfo.images) && postInfo.images !== '') {
            postInfo.images = [postInfo.images];
        }
        if (postInfo.text.trim() === '' &&  postInfo.images === '') {
            res.send({
                message: 'You can\'t add an empty post',
                isError: true,
            });
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('posts').insertOne({...postInfo, author: data._id}, (err, result) => {
                if (err) {
                    res.send({
                        message: 'Error',
                        isError: true,
                    });

                    db.close();

                    return;
                }

                dbo.collection('users').findOne({ _id: ObjectId(data._id) }, { fields: { name: 1, surname: 1, photo: 1}}, (er ,r) => {
                    if (er) {
                        res.send({
                            message: 'error',
                            isError: true,
                        });

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