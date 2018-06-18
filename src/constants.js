export const REGEXPS = {
    name: /^[A-Z][a-z]{1,32}$/,
    surname: /^[A-Z][a-z]{1,32}$/,
    middleName: /^[A-Z][a-z]{0,32}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    age: /^[1-9][0-9]?$/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{10,})$/,
};