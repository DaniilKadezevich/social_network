let initialState = {
    callback: function () {
        return null;
    },
    text: '',
    title: '',
    btnText: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SHOW_CONFIRM_MODAL':
            return {...state, callback: action.callback, text: action.text, title: action.title, btnText: action.btnText};
        case 'CLEAR_CONFIRM_MODAL':
            return initialState;
        default:
            return state;
    }

}