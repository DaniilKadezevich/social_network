const connectToTheDB = require('../connectToTheDB');
const {checkToken} = require('../jwt');
const { ObjectId } = require('mongodb');
const { sendErrorMessage } = require('../functions');


module.exports = function (token, images, res) {
    checkToken(token, (error, data) => {
        if (error) {
            sendErrorMessage('Invalid token', res);
            return;
        }
        if (!Array.isArray(images)) {
            images = [images];
        }

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').findOne({ _id: ObjectId(data._id) }, { fields: { gallery: 1}}, (err, r) => {
                let newGallery = [...images, ...r.gallery];

                dbo.collection('users').updateOne({ _id: ObjectId(data._id) }, { $set: { gallery: newGallery}} , (err, result) => {
                    if (err) {
                        sendErrorMessage('Can\'t add images to gallery', res);
                        db.close();
                        return;
                    }

                    res.send({
                        images,
                        isError: false,
                    })
                });
            });
        });
    });
};