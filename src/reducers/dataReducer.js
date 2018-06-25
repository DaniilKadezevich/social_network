let initialState = {
    users: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_USERS':
            return {...state, users: action.users};
        case 'REMOVE_USERS':
            return initialState;
        default:
            return state;
    }

}