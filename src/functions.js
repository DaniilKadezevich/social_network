import {REGEXPS} from './constants';
export function validateRegFormInputs(form) {
    let {gender, name, surname, middleName, email, age, photo} = form;
    return(
        REGEXPS.name.test(name.value) &&
        REGEXPS.surname.test(surname.value) &&
        (REGEXPS.middleName.test(middleName.value) || !middleName.value) &&
        REGEXPS.email.test(email.value) &&
        REGEXPS.age.test(age.value) &&
        !(gender.isValid === 'waiting' || !gender.isValid) &&
        !(photo.isValid === 'waiting' || !photo.isValid)
    )
}
export function validateLogInFormInputs(form) {
    let {password, email} = form;
    return(
        !(password.isValid === 'waiting' || !password.isValid) &&
        !(email.isValid === 'waiting' || !email.isValid)
    )
}