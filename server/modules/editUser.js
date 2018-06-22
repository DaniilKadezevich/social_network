const {checkToken, generateToken} = require('./jwt');
const connectToTheDB = require('./connectToTheDB');

module.exports = function (token, user, res) {
    checkToken(token, (error, data) => {
        if (error) {
            res.send({
                isError: true,
            });
            return;
        }

        let query = {email: data.email};

        console.log(user);

        connectToTheDB(function (dbo, db) {
            dbo.collection('users').update(query, {$set: user});

            dbo.collection('users').findOne({email: user.email}, (err, result) => {
                if (!result) {
                    console.log(result);
                    res.send({
                        isError: true,
                    });

                    db.close();

                    return;
                }

                let newToken = generateToken({email: result.email});

                res.send({
                    user: {...result, password: undefined},
                    isError: false,
                    token: newToken
                });
                db.close();

            })
        })
    });
};