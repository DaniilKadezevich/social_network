import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  Avatar  from '../../components/Avatar';

export const sidebarMenu = [
    {
        text:'My account',
        link: '/account',
        component: Avatar,
        props: {
            src: 'user',
            class: 'avatar-small mr-1'
        }
    },
    {
        text:'Friends',
        link: '/friends',
        component: FontAwesomeIcon,
        props: {
            icon: 'user-friends',
            className: 'mr-1'
        }
    },
    {
        text:'Search people',
        link: '/search-people',
        component: FontAwesomeIcon,
        props: {
            icon: 'search',
            className: 'mr-1'
        }

    },
    {
        text:'News feed',
        link: '/news',
        component: FontAwesomeIcon,
        props: {
            icon: 'newspaper',
            className: 'mr-1'
        }
    },
    {
        text:'Settings',
        link: '/settings',
        component: FontAwesomeIcon,
        props: {
            icon: 'cogs',
            className: 'mr-1'
        }
    },
];
