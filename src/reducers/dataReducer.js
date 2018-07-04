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
    index: 0,
    stopLoad: false,
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

        case 'ADD_POST':
            return {...state, posts: [ ...action.post, ...state.posts]};
        case 'LOAD_POSTS':
            return {...state, posts: [...state.posts, ...action.posts, ], index: state.index + action.posts.length, stopLoad: action.stopLoad };
        case 'DELETE_POST':
            let postsCopy = [...state.posts].filter(post => {
                return post._id !== action._id;
            });
            return {...state, posts: [...postsCopy] };
        case 'REMOVE_POSTS':
            let { posts, index } = initialState;
            return {...state, posts, index };
        default:
            return state;
    }

}