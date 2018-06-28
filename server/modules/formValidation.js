const { REGEXPS } = require('../constants');

function formValidation(userObj) {
    let {name, surname, middleName, email, age, gender} = userObj;
    return (
        REGEXPS.name.test(name) &&
        REGEXPS.surname.test(surname) &&
        (REGEXPS.middleName.test(middleName) || middleName === '') &&
         REGEXPS.email.test(email) &&
        REGEXPS.age.test(age) &&
        (gender === 'Male' || gender === 'Female')
    )
}
module.exports = formValidation;