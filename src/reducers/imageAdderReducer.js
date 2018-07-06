let initialState = {
    images: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_ADDER_IMAGES':
            return {...state, images: [...state.images, action.images]};
        case 'REMOVE_ADDER_IMAGE':
            let imagesCopy = [...state.images];
            imagesCopy.splice(action.index, 1);

            return {...state, images: [...imagesCopy]};

        case 'CLEAR_ADDER':
            return initialState;
        default:
            return state;
    }
}