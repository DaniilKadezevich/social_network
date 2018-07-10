import {ACTION_TYPES, preDelay, REGEXPS} from './constants';
import fetch from 'cross-fetch';
import $ from 'jquery';

export function validateFormInputs(form) {
    for (let field in form) {
        switch (field) {
            case 'gender':
                if (!form[field].value) {
                    return false;
                }
                continue;
            case 'photo':
                if (!form[field].file) {
                    return false;
                }
                continue;
            case 'middleName':
                if (!(REGEXPS[field].test(form[field].value) || !form[field].value)) {
                    return false;
                }
                continue;
            default:
                if (!REGEXPS[field].test(form[field].value)) {
                    return false;
                }
        }
    }
    return true;
}

export function errorHandler(dispatch, message, finish = true) {
    setTimeout(() => {
        if (finish) {
            dispatch({type: ACTION_TYPES.FINISH_LOADING});
        }

        if (message) {
            dispatch({
                type: ACTION_TYPES.SHOW_NOTIFICATION,
                style: 'danger',
                message,
                isTemporary: true,
            });
        }
    }, preDelay);
}

export function successHandler(dispatch, message, isTemporary = true) {
    setTimeout(() => {
        dispatch({type: ACTION_TYPES.FINISH_LOADING});

        if (message) {
            dispatch({
                type: ACTION_TYPES.SHOW_NOTIFICATION,
                style: 'success',
                message,
                isTemporary,
            });
        }
    }, preDelay);
}


export function setSizeClass() {
    let img = new Image();
    let sizeClass;

    img.onload = (e) => {
        sizeClass = e.target.width < e.target.height ? 'vertical' : 'horizontal';
        $(this.img).removeClass();
        $(this.img).addClass(sizeClass);
    };
    img.src = this.props.src;
}
export function addImages(event, callback) {
    for (let i = 0; i < event.target.files.length; i++) {
        let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        let filePath = event.target.value;

        if (!allowedExtensions.exec(filePath)){
            event.target.value = '';

            return;
        }
        let file = event.target.files[i];

        let reader = new FileReader();

        reader.onload = (e) => {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    event.target.value = '';
}

export function getToken() {
    let token = localStorage.getItem('token');

    return !token ? false : token;
}

export function makeRequest(url, method, headers = {}, body) {
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers,
        });
    }
    return fetch(url, {
        method,
        headers,
        body,
    });

}

export function makeRequestWithToken(url, method, headers = {}, body) {
    let token = getToken();

    if (!token) {
        return false
    }

    headers = {
        'Authorization': `Bearer ${token}`,
        ...headers,
    };

    return makeRequest(url, method, headers, body);
}