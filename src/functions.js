import { ACTION_TYPES, preDelay, REGEXPS } from './constants';

export function validateFormInputs(form) {
    let {gender, name, surname, middleName, email, age, photo} = form;
    return(
        REGEXPS.name.test(name.value) &&
        REGEXPS.surname.test(surname.value) &&
        (REGEXPS.middleName.test(middleName.value) || !middleName.value) &&
        REGEXPS.email.test(email.value) &&
        REGEXPS.age.test(age.value) &&
        gender.value &&
        photo.file
    )
}
export function validateLogInFormInputs(form) {
    let {password, email} = form;
    return(
        !(password.isValid === 'waiting' || !password.isValid) &&
        !(email.isValid === 'waiting' || !email.isValid)
    )
}
export function errorHandler(dispatch, message, finish = true) {
    setTimeout(() => {
        if (finish) {
            dispatch({type: ACTION_TYPES.FINISH_LOADING});
        }

        if (message) {
            dispatch({
                type: ACTION_TYPES.SHOW_NOTIFICATION,
                style: 'danger',
                message,
                isTemporary: true,
            });
        }
    }, preDelay);
}

export function successHandler(dispatch, message, isTemporary = true) {
    setTimeout(() => {
        dispatch({type: ACTION_TYPES.FINISH_LOADING});

        if (message) {
            dispatch({
                type: ACTION_TYPES.SHOW_NOTIFICATION,
                style: 'success',
                message,
                isTemporary,
            });
        }
    }, preDelay);
}