let initialState = {
    users: [],
    displayedUser: {
        isFriend: false,
        name: '',
        surname: '',
        middleName: '',
        email: '',
        age: '',
        gender: '',
        photo: '',
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_USERS':
            return {...state, users: action.users};
        case 'REMOVE_USERS':
            return {...state, users: []};

        case 'LOAD_USER_INFO':
            return {...state, displayedUser: action.user};
        case 'REMOVE_USER_INFO':
            let { displayedUser } = initialState;
            return {...state, displayedUser };
        default:
            return state;
    }

}