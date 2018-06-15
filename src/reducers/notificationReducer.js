let initialState = {
    style: '',
    isShown: false,
    message: '',
};
export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {...state, isShown: true, message: action.message, style: action.style};
        case 'HIDE_NOTIFICATION':
            return {...state, isShown: false, message: '', style: ''};
        default:
            return state
    }
}


