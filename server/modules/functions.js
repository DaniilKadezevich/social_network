module.exports.sendErrorMessage = function (message, res) {
    res.send({
        message,
        isError: true,
    });
};
module.exports.checkIsAll = function (data, index, db, res) {
    if (!data.length) {
        res.send({
            data,
            isError: false,
            isAll: true,
        });
        db.close();
        return true;
    }
    if (index === data.length) {
        res.send({
            data: [],
            isError: false,
            isAll: true,
        });
        db.close();
        return true;
    }
};