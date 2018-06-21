let initialState = {
    isLoading: false,
};
export default function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case 'START_LOADING':
            return {...state, isLoading: true};
        case 'FINISH_LOADING':
            return {...state, isLoading: false};
        default:
            return state
    }
}
