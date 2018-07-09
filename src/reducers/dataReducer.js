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
        _id: '',
    },
    posts: [],
    gallery: [],
    index: 0,
    stopLoad: false,
    regexp: /.*/,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_USERS':
            return {...state, users: [ ...state.users, ...action.users ], index: state.index + action.users.length, stopLoad: action.stopLoad};
        case 'REMOVE_USERS':
            return {...state, users: [], index: 0, stopLoad: false};
        case 'SET_REGEXP':
            return {...state, regexp: action.regexp};

        case 'LOAD_USER_INFO':
            return {...state, displayedUser: {...state.displayedUser, ...action.user}};
        case 'REMOVE_USER_INFO':
            let { displayedUser } = initialState;
            return {...state, displayedUser };

        case 'ADD_POST':
            return {...state, posts: [ ...action.post, ...state.posts ], index: state.index + 1};
        case 'LOAD_POSTS':
            return {...state, posts: [ ...state.posts, ...action.posts ], index: state.index + action.posts.length, stopLoad: action.stopLoad };
        case 'DELETE_POST':
            let postsCopy = [...state.posts].filter(post => {
                return post._id !== action._id;
            });
            return {...state, posts: [...postsCopy], index: state.index - 1 };
        case 'REMOVE_POSTS':
            let { posts, index, stopLoad } = initialState;
            return {...state, posts, index, stopLoad };

        case 'LOAD_GALLERY_IMAGES':
            return {...state, gallery: [...state.gallery, ...action.images ], index: state.index + action.images.length, stopLoad: action.stopLoad};
        case 'ADD_GALLERY_IMAGES':
            return {...state, gallery: [...action.images, ...state.gallery ], index: state.index + action.images.length};
        case 'REMOVE_GALLERY_IMAGE':
            let gallery =  [...state.gallery];
            gallery.splice(action.index, 1);
            return {...state, gallery, index: state.index - 1};

        case 'CLEAR_DATA':
            return initialState;
        default:
            return state;
    }

}