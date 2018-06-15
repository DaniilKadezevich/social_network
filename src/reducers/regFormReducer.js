let initialState = {
    name: {
        value: '',
        isValid: 'waiting',
    },
    surname: {
        value: '',
        isValid: 'waiting',
    },
    middleName: {
        value: '',
        isValid: true,
    },
    email: {
        value: '',
        isValid: 'waiting',
    },
    age: {
        value: '',
        isValid: 'waiting',
    },
    gender: {
        value: '',
        isValid: 'waiting',
    },
    photo: {
        error: '',
        file: '',
        isValid: 'waiting',
    },
};
export default function formReducer(state=initialState, action) {
    switch (action.type) {
        case 'ADD_NAME':
            return {...state, name: {...state.name, value: action.value}};
        case 'VALIDATE_NAME':
            return {...state, name: {...state.name, isValid: action.status}};

        case 'ADD_SURNAME':
            return {...state, surname: {...state.surname, value: action.value}};
        case 'VALIDATE_SURNAME':
            return {...state, surname: {...state.surname, isValid: action.status}};

        case 'ADD_MIDDLE_NAME':
            return {...state, middleName: {...state.middleName, value: action.value}};
        case 'VALIDATE_MIDDLE_NAME':
            return {...state, middleName: {...state.middleName, isValid: action.status}};

        case 'ADD_EMAIL':
            return {...state, email: {...state.email, value: action.value}};
        case 'VALIDATE_EMAIL':
            return {...state, email: {...state.email, isValid: action.status}};

        case 'ADD_AGE':
            return {...state, age: {...state.age, value: action.value}};
        case 'VALIDATE_AGE':
            return {...state, age: {...state.age, isValid: action.status}};

        case 'ADD_GENDER':
            return {...state, gender: {...state.gender, isValid: true, value: action.gender}};
        case 'VALIDATE_GENDER':
            return {...state, gender: {...state.gender, isValid: action.status}};

        case 'ADD_PHOTO':
            return {...state, photo: {...state.photo, isValid: true,  file: action.file}};
        case 'VALIDATE_PHOTO':
            return {...state, photo: {...state.photo, isValid: action.status, error: action.message}};
        default:
            return state
    }
}