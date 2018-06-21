import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar }  from './components/index'


export const REGEXPS = {
    name: /^[A-Za-z]{1,32}$/,
    surname: /^[A-Za-z]{1,32}$/,
    middleName: /^[A-Za-z]{1,32}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    age: /^[1-9][0-9]?$/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{10,})$/,
};
const AvatarComp = () => ({
    type: Avatar,
    props: {
        class: 'avatar-small'
        }
});
export const sidebarMenu = [
    {
        text:'My account',
        link: '/account',
        component: AvatarComp
    },
    {
        text:'Friends',
        link: '/friends',
        component: AvatarComp
    },
    {
        text:'Search people',
        link: '/search-people',
        component: AvatarComp
    },
    {
        text:'News feed',
        link: '/news',
        component: AvatarComp
    },
    {
        text:'Settings',
        link: '/settings',
        component: AvatarComp
    },
];
export const preDelay = 1000;