import fetch from 'cross-fetch';
import { preDelay, ACTION_TYPES } from "./constants";

export function signUp(obj) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch('/sign-up', {
            method: "POST",
            body: obj
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError){
                    setTimeout(() => {
                        dispatch({type: ACTION_TYPES.FINISH_LOADING});

                        dispatch({
                            type: ACTION_TYPES.SHOW_NOTIFICATION,
                            style: 'danger',
                            message: data.message,
                            isTemporary: true,
                        });
                    }, preDelay);
                } else {
                    dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                    localStorage.setItem('token', data.token);

                    dispatch({type: ACTION_TYPES.CLEAR_FORM});
                    setTimeout(() => {
                        dispatch({type: ACTION_TYPES.FINISH_LOADING});

                        dispatch({
                            type: ACTION_TYPES.SHOW_NOTIFICATION,
                            style: 'success',
                            message: `You are successfully registered. Your password: ${data.user.password}`,
                            isTemporary: false,
                        });
                    }, preDelay);
                }
            })
    }
}

export function logIn(obj) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch('/log-in', {
            method: "POST",
            body: obj,
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    setTimeout(() => {
                        dispatch({type: ACTION_TYPES.FINISH_LOADING});

                        dispatch({
                            type: ACTION_TYPES.SHOW_NOTIFICATION,
                            style: 'danger',
                            message: data.message,
                            isTemporary: true,
                        });
                    }, preDelay);
                } else {
                    dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                    localStorage.setItem('token', data.token);

                    dispatch({type: ACTION_TYPES.CLEAR_FORM});
                    setTimeout(() => {
                        dispatch({type: ACTION_TYPES.FINISH_LOADING});

                        dispatch({
                            type: ACTION_TYPES.SHOW_NOTIFICATION,
                            style: 'success',
                            message: `Welcome back, ${data.user.name}`,
                            isTemporary: true,
                        });
                    }, preDelay);
                }
            });
    }
}

export function editUser(obj) {
    return dispatch => {
        let token = localStorage.getItem('token');

        dispatch({type: ACTION_TYPES.START_LOADING});

        console.log(token);

        return fetch('/edit-user', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },

            method: "POST",
            body: obj
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    console.log(data);
                    setTimeout(() => {
                        dispatch({type: ACTION_TYPES.FINISH_LOADING});

                        dispatch({
                            type: ACTION_TYPES.SHOW_NOTIFICATION,
                            style: 'danger',
                            message: data.message,
                            isTemporary: true,
                        });
                    }, preDelay);
                } else {
                    dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});

                    dispatch({type: ACTION_TYPES.CLEAR_FORM});

                    setTimeout(() => {
                        dispatch({type: ACTION_TYPES.FINISH_LOADING});

                        dispatch({
                            type: ACTION_TYPES.SHOW_NOTIFICATION,
                            style: 'success',
                            message: 'You have successfully edited your profile',
                            isTemporary: true,
                        });
                    }, preDelay);
                }
            });
    }
}
export function getUserByToken(token) {
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch('/get-user-by-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    console.log('error');
                } else {
                    dispatch({type: ACTION_TYPES.AUTHORIZE, user: data.user});
                }
                setTimeout(() => {
                    dispatch({type: ACTION_TYPES.FINISH_LOADING});
                }, preDelay);
            });
    }
}

export function getUsers(token, regexp = /.*/) {
    return dispatch => {
        let serialized = regexp.source;

        return fetch('/get-users', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ regexp: serialized })
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    dispatch({
                        type: ACTION_TYPES.SHOW_NOTIFICATION,
                        style: 'danger',
                        message: data.message,
                        isTemporary: true,
                    });
                } else {
                    dispatch({type: ACTION_TYPES.ADD_USERS, users: data.users});
                }
            });
    }
}

export function getFriends(token) {
    return dispatch => {


        return fetch('/get-friends', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    dispatch({
                        type: ACTION_TYPES.SHOW_NOTIFICATION,
                        style: 'danger',
                        message: data.message,
                        isTemporary: true,
                    });
                } else {
                    dispatch({type: ACTION_TYPES.ADD_USERS, users: data.friends});
                }
            });
    }
}

export function addFriend(obj) {
    let token = localStorage.getItem('token');
    return dispatch => {
        return fetch('/add-friend', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    dispatch({
                        type: ACTION_TYPES.SHOW_NOTIFICATION,
                        style: 'danger',
                        message: data.message,
                        isTemporary: true,
                    });
                } else {
                    dispatch({type: ACTION_TYPES.LOAD_USER_INFO, user: data.user});
                }
            });
    }
}

export function removeFriend(obj) {
    let token = localStorage.getItem('token');
    return dispatch => {
        return fetch('/remove-friend', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    dispatch({
                        type: ACTION_TYPES.SHOW_NOTIFICATION,
                        style: 'danger',
                        message: data.message,
                        isTemporary: true,
                    });
                } else {
                    dispatch({type: ACTION_TYPES.LOAD_USER_INFO, user: data.user});
                }
            });
    }
}

export function uploadUser(obj) {
    let token = localStorage.getItem('token');
    return dispatch => {
        dispatch({type: ACTION_TYPES.START_LOADING});

        return fetch('/upload-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    setTimeout(() => {
                        dispatch({type: ACTION_TYPES.FINISH_LOADING});
                        dispatch({
                            type: ACTION_TYPES.SHOW_NOTIFICATION,
                            style: 'danger',
                            message: data.message,
                            isTemporary: true,
                        });
                    }, preDelay);
                } else {
                    setTimeout(() => {
                        dispatch({type: ACTION_TYPES.LOAD_USER_INFO, user: data.user});
                        dispatch({type: ACTION_TYPES.FINISH_LOADING});
                    }, preDelay);
                }
            });
    }
}
