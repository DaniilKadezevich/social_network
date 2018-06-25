import fetch from 'cross-fetch';
import { preDelay } from "./constants";

export function signUp(obj) {
    return dispatch => {
        dispatch({type: 'START_LOADING'});

        return fetch('/sign-up', {
            method: "POST",
            body: obj
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError){
                    setTimeout(() => {
                        dispatch({type: 'FINISH_LOADING'});

                        dispatch({
                            type: 'SHOW_NOTIFICATION',
                            style: 'danger',
                            message: data.message,
                            isTemporary: true,
                        });
                    }, preDelay);
                } else {
                    dispatch({type: 'AUTHORIZE', user: data.user});

                    localStorage.setItem('token', data.token);

                    dispatch({type: 'CLEAR_FORM'});
                    setTimeout(() => {
                        dispatch({type: 'FINISH_LOADING'});

                        dispatch({
                            type: 'SHOW_NOTIFICATION',
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
        dispatch({type: 'START_LOADING'});

        return fetch('/log-in', {
            method: "POST",
            body: obj,
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    setTimeout(() => {
                        dispatch({type: 'FINISH_LOADING'});

                        dispatch({
                            type: 'SHOW_NOTIFICATION',
                            style: 'danger',
                            message: data.message,
                            isTemporary: true,
                        });
                    }, preDelay);
                } else {
                    dispatch({type: 'AUTHORIZE', user: data.user});

                    localStorage.setItem('token', data.token);

                    dispatch({type: 'CLEAR_FORM'});
                    setTimeout(() => {
                        dispatch({type: 'FINISH_LOADING'});

                        dispatch({
                            type: 'SHOW_NOTIFICATION',
                            style: 'success',
                            message: `Welcome back, ${data.user.name}`,
                            isTemporary: false,
                        });
                    }, preDelay);
                }
            });
    }
}

export function editUser(obj) {
    return dispatch => {
        let token = localStorage.getItem('token');

        dispatch({type: 'START_LOADING'});

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
                        dispatch({type: 'FINISH_LOADING'});

                        dispatch({
                            type: 'SHOW_NOTIFICATION',
                            style: 'danger',
                            message: data.message,
                            isTemporary: true,
                        });
                    }, preDelay);
                } else {
                    dispatch({type: 'AUTHORIZE', user: data.user});

                    dispatch({type: 'CLEAR_FORM'});

                    setTimeout(() => {
                        dispatch({type: 'FINISH_LOADING'});

                        dispatch({
                            type: 'SHOW_NOTIFICATION',
                            style: 'success',
                            message: 'You have successfully edited your profile',
                            isTemporary: false,
                        });
                    }, preDelay);
                }
            });
    }
}
export function getUserByToken(token) {
    return dispatch => {
        dispatch({type: 'START_LOADING'});

        return fetch('/get-user-by-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isError) {
                    console.log(data);
                } else {
                    dispatch({type: 'AUTHORIZE', user: data.user});
                }
                setTimeout(() => {
                    dispatch({type: 'FINISH_LOADING'});
                }, preDelay);
            });
    }
}