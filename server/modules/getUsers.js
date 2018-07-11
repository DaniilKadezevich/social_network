const { sendErrorMessage } = require('./functions');
const { maxUsers } = require('../constants');

module.exports = function (dbo, db, query, res, index) {
    dbo.collection('users').find(query, { fields: {password: 0, middleName: 0, email: 0, gallery: 0} }).toArray(function (err, result) {
        if (err) {
            sendErrorMessage('Can\'t get users', res);
            db.close();
            return;
        }
        if (!result.length) {
            res.send({
                users: result,
                isError: false,
                isAll: true,
            });
            db.close();
            return;
        }

        const users = [];
        const deadline = (result.length < (index + maxUsers)) ? result.length : (index + maxUsers);

        if (index === deadline) {
            res.send({
                users,
                isError: false,
                isAll: true,
            });
        }

        for (let i = index; i < deadline; i++) {
            users.push(result[i]);
            if (deadline - i === 1) {
                const isAll = !(!(deadline % maxUsers));
                res.send({
                    users,
                    isError: false,
                    isAll,
                });
                db.close();
            }
        }
    });
};