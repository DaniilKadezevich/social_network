let initialState = {
    text: '',
    images: [],
};
export default function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_POST_TEXT':
            return {...state, text: action.text};
        case 'ADD_POST_IMAGE':
            return {...state, images: [...state.images, action.images]};
        case 'REMOVE_POST_IMAGE':
            let imagesCopy = [...state.images];
            imagesCopy.splice(action.index, 1);

            return {...state, images: [...imagesCopy]};
        case 'CLEAR_POST_FIELDS':
            return initialState;
        default:
            return state;
    }
}