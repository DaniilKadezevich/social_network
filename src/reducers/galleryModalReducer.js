let initialState = {
    images: [],
    user: {
        name: '',
        surname: '',
        photo: '',
        _id: '',
    },
    isOpen: false,
    initialSlide: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SHOW_GALLERY_MODAL':
            return {...state, isOpen: true};
        case 'HIDE_GALLERY_MODAL':
            return {...state, isOpen: false};

        case 'SET_MODAL_USER':
            return {...state, user: {...state.user, ...action.user}};
        case 'ADD_SLIDER_IMAGES':
            return {...state, images: [...state.images, ...action.images]};
        case 'SET_INITIAL_SLIDE':
            return {...state, initialSlide: action.index};

        case 'CLEAR_MODAL':
            return initialState;
        default:
            return state;
    }

}