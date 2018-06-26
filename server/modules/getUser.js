const connectToTheDB = require('./connectToTheDB');

module.exports = function (query, res) {
    connectToTheDB(function (dbo, db) {

        dbo.collection('users').findOne(query, { fields: {password: 0} }, (err, result) => {
            if (!result) {
                res.send({
                    message: 'No user with this id',
                    isError: true,
                });
                db.close();

                return;
            }

            res.send({
                user: {...result},
                isError: false,
            });
        })
    });
};