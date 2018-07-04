module.exports = function (dbo, db, query, res) {
    dbo.collection('users').find(query, { fields: {password: 0, middleName: 0, email: 0} }).toArray(function (err, result) {
        if (err) {
            db.close();
            res.send({
                message: 'Some error',
                isError: true,
            });

            return;
        }

        res.send({
            users: result,
            isError: false,
        });

        db.close();
    });
};