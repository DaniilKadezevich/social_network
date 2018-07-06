const connectToTheDB = require('../connectToTheDB');
const { ObjectId } = require('mongodb');
const { sendErrorMessage, checkIsAll } = require('../functions');
const {checkToken} = require('../jwt');

module.exports = function (token, index, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').findOne({ _id: ObjectId(data._id)}, {fields: {gallery: 1}}, (err, result) => {
                if (err) {
                    sendErrorMessage('Error', res);
                    db.close();
                    return;
                }

                if (checkIsAll(result.gallery, index, db, res)) {
                    return;
                }
                const images = [];
                const deadline = (result.gallery.length < (index + 12)) ? result.gallery.length : (index + 12);

                for (let i = index; i < deadline; i++) {
                    images.push(result.gallery[i]);
                    if (deadline - i === 1) {
                        let isAll = !(!(deadline < 12));
                        res.send({
                            data: images,
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