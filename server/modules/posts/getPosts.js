const connectToTheDB = require('../connectToTheDB');
const { ObjectId } = require('mongodb');
const moment = require('moment');
const { sendErrorMessage } = require('../functions');

module.exports = function (query, res) {
    connectToTheDB(function (dbo, db) {
        dbo.collection('posts').find(query).toArray(function (err, r) {
            if (err) {
                sendErrorMessage('Can\'t get posts', res);
                db.close();
                return;
            }

            let posts = [];

            for (let i = 0; i < r.length; i++) {
                let post = r[i];
                dbo.collection('users').findOne({ _id: ObjectId(post.author) }, { fields: { name: 1, surname: 1, photo: 1}}, (er ,result) => {
                    if (er) {
                        sendErrorMessage('Can\'t find post author', res);
                        db.close();
                        return;
                    }

                    posts.push({...post, name: result.name, surname: result.surname, photo: result.photo});
                    if (r.length - i === 1) {
                        posts.sort(function (a, b) {
                            return moment(b.date, 'MMMM Do YYYY, h:mm a') - moment(a.date, 'MMMM Do YYYY, h:mm a');
                        });
                        res.send({
                            posts,
                            isError: false,
                          });
                        db.close();
                    }
                });
            }
        });
    });
};