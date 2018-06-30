let initialState = {
    name: {
        error: '',
        value: '',
        isValid: 'waiting',
    },
    surname: {
        error: '',
        value: '',
        isValid: 'waiting',
    },
    middleName: {
        error: '',
        value: '',
        isValid: 'waiting',
    },
    email: {
        error: '',
        value: '',
        isValid: 'waiting',
    },
    age: {
        error: '',
        value: '',
        isValid: 'waiting',
    },
    gender: {
        error: '',
        value: '',
        isValid: 'waiting',
    },
    photo: {
        error: '',
        file: '',
        isValid: 'waiting',
    },
    password: {
        error: '',
        value: '',
        isValid: 'waiting',
    }
};
export default function formReducer(state=initialState, action) {
    switch (action.type) {
        case 'ADD_NAME':
            return {...state, name: {...state.name, value: action.value}};
        case 'VALIDATE_NAME':
            return action.status ? {...state, name: {...state.name, isValid: action.status, error: ''}} :
                {...state, name: {...state.name, isValid: false, error: 'Required.'}};

        case 'ADD_SURNAME':
            return {...state, surname: {...state.surname, value: action.value}};
        case 'VALIDATE_SURNAME':
            return action.status ? {...state, surname: {...state.surname, isValid: action.status, error: ''}} :
                {...state, surname: {...state.surname, isValid: false, error: 'Required.'}};

        case 'ADD_MIDDLE_NAME':
            return {...state, middleName: {...state.middleName, value: action.value}};
        case 'VALIDATE_MIDDLE_NAME':
            return action.status ? {...state, middleName: {...state.middleName, isValid: action.status, error: ''}} :
                {...state, middleName: {...state.middleName, isValid: false, error: 'Required.'}};

        case 'ADD_EMAIL':
            return {...state, email: {...state.email, value: action.value}};
        case 'VALIDATE_EMAIL':
            return action.status ? {...state, email: {...state.email, isValid: action.status, error: ''}} :
                {...state, email: {...state.email, isValid: false, error: 'Enter a valid email address'}};

        case 'ADD_AGE':
            return {...state, age: {...state.age, value: action.value}};
        case 'VALIDATE_AGE':
            return action.status ? {...state, age: {...state.age, isValid: action.status, error: ''}} :
                {...state, age: {...state.age, isValid: false, error: 'Number from 1 to 99'}};

        case 'ADD_GENDER':
            return {...state, gender: {...state.gender, isValid: true, value: action.gender, error: ''}};
        case 'VALIDATE_GENDER':
            return action.status ? {...state, gender: {...state.gender, isValid: action.status, error: ''}} :
                {...state, gender: {...state.gender, isValid: false, error: 'Required'}};

        case 'ADD_PHOTO':
            return {...state, photo: {...state.photo, error: '', isValid: true,  file: action.file}};
        case 'VALIDATE_PHOTO':
            return  action.status ?  {...state, photo: {...state.photo, isValid: action.status, error: ''}} :
                 {...state, photo: {...state.photo, file: '', isValid: false, error: action.error}};

        case 'ADD_PASSWORD':
            return {...state, password: {...state.password, value: action.value}};
        case 'VALIDATE_PASSWORD':
            return action.status ? {...state, password: {...state.password, isValid: action.status, error: ''}} :
                {...state, password: {...state.password, isValid: false, error: 'At least 10 symbols'}};

        case 'CLEAR_FORM':
            return initialState;
        default:
            return state;
    }
}