const connectToTheDB = require('../connectToTheDB');
const { ObjectId } = require('mongodb');
const { sendErrorMessage, checkIsAll } = require('../functions');

module.exports = function (query, index, res) {
    connectToTheDB(function (dbo, db) {
        dbo.collection('posts').find(query).toArray(function (err, r) {
            if (err) {
                sendErrorMessage('Can\'t get posts', res);
                db.close();
                return;
            }
            let result = r.reverse();

            if (checkIsAll(result, index, db, res)) {
                return
            }

            const posts = [];
            const deadline = (result.length < (index + 10)) ? result.length : (index + 10);

            const autors = [];
            result.forEach((post) => {
                autors.push(ObjectId(post.author));
            });
            dbo.collection('users').find({ _id: { $in: autors } }, { fields: { name: 1, surname: 1, photo: 1}}).toArray((err, r) => {
                for (let i = index; i < deadline; i++) {
                    r.forEach((author) => {
                        if (author._id.toString() === result[i].author) {
                            posts.push({...result[i], name: author.name, surname: author.surname, photo: author.photo});
                        }
                    });
                    if (deadline - i === 1) {
                        const isAll = !(!(deadline < 10));
                        res.send({
                            data: posts,
                            isError: false,
                            isAll,
                        });
                        db.close();
                    }
                }
            });
        });
    });
};