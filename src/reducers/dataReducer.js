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
    },
    posts: [],
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

        case 'LOAD_POSTS':
            return {...state, posts: [...action.posts, ...state.posts] };
        case 'DELETE_POST':
            let postsCopy = [...state.posts].filter(post => {
                return post._id !== action._id;
            });

            return {...state, posts: [...postsCopy] };
        case 'REMOVE_POSTS':
            let { posts } = initialState;
            return {...state, posts };
        default:
            return state;
    }

}