let initialState = {
    greeting: 'hello world',
};
export default function basicReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_GREETING":
             return {...state, greeting: action.payload};
        default:
            return state
    }

}