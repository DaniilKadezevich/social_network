let initialState = {
    style: '',
    isShown: false,
    message: '',
    isTemporary: false,
};
export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {...state, isShown: true, message: action.message, style: action.style, isTemporary: action.isTemporary};
        case 'HIDE_NOTIFICATION':
            return {...state, isShown: false, message: '', style: '', isTemporary: false};
        default:
            return state
    }
}


