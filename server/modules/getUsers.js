const { sendErrorMessage, checkIsAll } = require('./functions');

module.exports = function (dbo, db, query, res, index) {
    dbo.collection('users').find(query, { fields: {password: 0, middleName: 0, email: 0, gallery: 0} }).toArray(function (err, result) {
        if (err) {
            sendErrorMessage('Can\'t get users', res);
            db.close();
            return;
        }

        if (checkIsAll(result, index, db, res)) {
            return
        }

        const users = [];
        const deadline = (result.length < (index + 10)) ? result.length : (index + 10);

        for (let i = index; i < deadline; i++) {
            users.push(result[i]);
            if (deadline - i === 1) {
                const isAll = !(!(deadline < 10));
                res.send({
                    data: users,
                    isError: false,
                    isAll,
                });
                db.close();
            }
        }
    });
};