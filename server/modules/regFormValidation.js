let costants = require('../constants');

function regFormValidation(userObj) {
    let {name, surname, middleName, email, age, gender} = userObj;
    return (
        costants.REGEXPS.name.test(name) &&
        costants.REGEXPS.surname.test(surname) &&
        (costants.REGEXPS.middleName.test(middleName) || middleName === '') &&
        costants. REGEXPS.email.test(email) &&
        costants.REGEXPS.age.test(age) &&
        (gender === 'Male' || gender === 'Female')
    )
}
module.exports = regFormValidation;