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
        case 'SING_IN':
            let {gender, name, surname, middleName, email, age, photo} = action.user;
            return {...state, isAuthorized: true, gender, name, surname, middleName, email, age, photo};
        case 'LOG_OUT':
            return {...state, isAuthorized: false, gender: '', name: '', surname: '', middleName: '', email: '', age: '', photo: ''};
        default:
            return state;
    }

}