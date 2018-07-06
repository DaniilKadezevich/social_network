const { MIN_PASSWORD_LENGTH } = require('../constants');

function generatePassword() {
    let password = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

    for (let i = 0; i < MIN_PASSWORD_LENGTH; i++) {
        password += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return password;
}
module.exports = generatePassword;