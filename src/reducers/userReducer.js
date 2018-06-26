let initialState = {
    isAuthorized: false,
    name: '',
    surname: '',
    middleName: '',
    email: '',
    age: '',
    gender: '',
    photo: '',
    _id: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'AUTHORIZE':
            let {gender, name, surname, middleName, email, age, photo, _id} = action.user;
            return {...state, isAuthorized: true, gender, name, surname, middleName, email, age, photo, _id};
        case 'LOG_OUT':
            return initialState;
        default:
            return state;
    }

}