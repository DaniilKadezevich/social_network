let initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_OLD_PASSWORD':
            return {...state, oldPassword: action.value};
        case 'ADD_NEW_PASSWORD':
            return {...state, newPassword: action.value};
        case 'ADD_CONFIRM_PASSWORD':
            return {...state, confirmPassword: action.value};

        case 'CLEAR_PASSWORD_INPUTS':
            return initialState;
        default:
            return state;
    }

}