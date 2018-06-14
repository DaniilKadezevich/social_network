let initialState = {
    name: {
        text: '',
        isValid: 'waiting',
    },
    surname: {
        text: '',
        isValid: 'waiting',
    },
    middleName: {
        text: '',
        isValid: true,
    },
    email: {
        text: '',
        isValid: 'waiting',
    },
    age: {
        text: '',
        isValid: 'waiting',
    },
    gender: {
        value: '',
        isValid: 'waiting',
    },
    photo: {
        error: '',
        path: '',
        isValid: 'waiting',
    },
};
export default function formReducer(state=initialState, action) {
    switch (action.type) {
        case 'ADD_NAME':
            return {...state, name: {...state.name, text: action.text}};
        case 'VALIDATE_NAME':
            return {...state, name: {...state.name, isValid: action.status}};

        case 'ADD_SURNAME':
            return {...state, surname: {...state.surname, text: action.text}};
        case 'VALIDATE_SURNAME':
            return {...state, surname: {...state.surname, isValid: action.status}};

        case 'ADD_MIDDLE_NAME':
            return {...state, middleName: {...state.middleName, text: action.text}};
        case 'VALIDATE_MIDDLE_NAME':
            return {...state, middleName: {...state.middleName, isValid: action.status}};

        case 'ADD_EMAIL':
            return {...state, email: {...state.email, text: action.text}};
        case 'VALIDATE_EMAIL':
            return {...state, email: {...state.email, isValid: action.status}};

        case 'ADD_AGE':
            return {...state, age: {...state.age, text: action.text}};
        case 'VALIDATE_AGE':
            return {...state, age: {...state.age, isValid: action.status}};

        case 'ADD_GENDER':
            return {...state, gender: {...state.gender, isValid: true, value: action.gender}};
        case 'VALIDATE_GENDER':
            return {...state, gender: {...state.gender, isValid: action.status}};

        case 'ADD_PHOTO':
            return {...state, photo: {...state.photo, isValid: true,  path: action.path}};
        case 'VALIDATE_PHOTO':
            return {...state, photo: {...state.photo, isValid: false, error: action.message}};
        default:
            return state
    }
}