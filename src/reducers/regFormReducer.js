let initialState = {
        name: {
            text: '',
            isValid: '',
        },
        surname: '',
        middleName: '',
        email: '',
        age: '',
        gender: '',
        photo: '',
};
export default function regFormReducer(state=initialState, action) {
    switch (action.type) {
        case 'ADD_NAME':
            return {...state, name: {...state.name, text: action.payload}};
        case 'VALIDATE_NAME':
            return {...state, name: {...state.name, isValid: action.payload}};
        default:
            return state
    }
}