const connectToTheDB = require('./connectToTheDB');

module.exports = function (query, res) {
    connectToTheDB(function (dbo, db) {
        dbo.collection('users').findOne(query, (err, result) => {
            console.log(result);
            console.log(result);
            if (!result) {
                res.send({
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