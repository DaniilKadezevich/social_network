export const REGEXPS = {
    name: /^[A-Za-z]{1,32}$/,
    surname: /^[A-Za-z]{1,32}$/,
    middleName: /^[A-Za-z]{1,32}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    age: /^[1-9][0-9]?$/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{10,})$/,
};
export const sidebarMenu = [
    {
        text:'My account',
        link: '/account',
    },
    {
        text:'Friends',
        link: '/friends',
    },
    {
        text:'Search people',
        link: '/search-people',
    },
    {
        text:'News feed',
        link: '/news',
    },
    {
        text:'Settings',
        link: '/settings',
    },
];
export const preDelay = 1000;