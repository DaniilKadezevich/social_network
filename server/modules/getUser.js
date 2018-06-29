const connectToTheDB = require('./connectToTheDB');

module.exports = function (query, res) {
    connectToTheDB(function (dbo, db) {
        console.log(query);
        dbo.collection('users').findOne(query, (err, result) => {
            if (!result) {
                res.send({
                    message: 'No user with this id',
                    isError: true,
                });
                db.close();

                return;
            }

            res.send({
                user: {...result, password: undefined},
                isError: false,
            });
        })
    });
};