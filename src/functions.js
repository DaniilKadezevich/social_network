import { ACTION_TYPES, preDelay, REGEXPS } from './constants';
import $ from "jquery";

export function validateFormInputs(form) {
    let {gender, name, surname, middleName, email, age, photo} = form;
    let isFormValid = (
        REGEXPS.name.test(name.value) &&
        REGEXPS.surname.test(surname.value) &&
        (REGEXPS.middleName.test(middleName.value) || !middleName.value) &&
        REGEXPS.email.test(email.value) &&
        REGEXPS.age.test(age.value) &&
        gender.value &&
        photo.file
    );
    return isFormValid;
}
export function validateLogInFormInputs(form) {
    let {password, email} = form;
    let isFormValid = (
        REGEXPS.email.test(email.value) &&
        REGEXPS.password.test(password.value)
    );
    return isFormValid;
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

export function setSizeClass() {
    let img = new Image();
    let sizeClass;

    img.onload = (e) => {
        sizeClass = e.target.width < e.target.height ? 'vertical' : 'horizontal';
        $(this.img).removeClass();
        $(this.img).addClass(sizeClass);
    };
    img.src = this.props.src;
}