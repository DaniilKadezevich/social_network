export function validateRegFormInputs(gender, name, surname, middleName, email, age, photo) {
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