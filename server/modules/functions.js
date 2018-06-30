module.exports.sendErrorMessage = function (message, res) {
    res.send({
        message,
        isError: true,
    });
};