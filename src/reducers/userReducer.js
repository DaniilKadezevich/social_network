let initialState = {
    isAuthorized: false,
    name: '',
    surname: '',
    middleName: '',
    email: '',
    age: '',
    gender: '',
    photo: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'AUTHORIZE':
            let {gender, name, surname, middleName, email, age, photo} = action.user;
            return {...state, isAuthorized: true, gender, name, surname, middleName, email, age, photo};
        case 'LOG_OUT':
            return initialState;
        default:
            return state;
    }

}