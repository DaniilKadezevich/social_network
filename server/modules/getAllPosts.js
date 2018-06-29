const {checkToken} = require('./jwt');
const getPosts = require('./getPosts');

module.exports = function (token, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                message: 'Invalid token',
                isError: true,
            });

            return;
        }
        let query = {};
        getPosts(query, res)
    });
};