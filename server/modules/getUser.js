const connectToTheDB = require('./connectToTheDB');
const { sendErrorMessage } = require('./functions');

module.exports = function (query, res) {
    connectToTheDB(function (dbo, db) {

        dbo.collection('users').findOne(query, { fields: {password: 0} }, (err, result) => {
            if (!result) {
                sendErrorMessage('No user with this id', res);
                db.close();
                return;
            }

            res.send({
                user: {...result},
                isError: false,
            });
            db.close();
        })
    });
};