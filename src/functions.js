export function validateRegFormInputs(form) {
    let {gender, name, surname, middleName, email, age, photo} = form;
    return(
        !(gender.isValid === 'waiting' || !gender.isValid) &&
        !(name.isValid === 'waiting' || !name.isValid) &&
        !(surname.isValid === 'waiting' || !surname.isValid) &&
        middleName.isValid &&
        !(email.isValid === 'waiting' || !email.isValid) &&
        !(age.isValid === 'waiting' || !age.isValid) &&
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