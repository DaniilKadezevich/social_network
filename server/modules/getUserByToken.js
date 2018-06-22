const {checkToken} = require('./jwt');
const getUser = require('./getUser');

module.exports = function (token, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                isError: false,
            });
            return;
        }

        let query = {email: data.email};

        getUser(query, res);
    });
};
