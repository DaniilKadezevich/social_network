import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  Avatar  from '../../components/Avatar';

export const sidebarMenu = [
    {
        text: 'myAccount',
        link: '/account',
        component: Avatar,
        props: {
            class: 'avatar-small mr-1'
        }
    },
    {
        text: 'friends',
        link: '/friends',
        component: FontAwesomeIcon,
        props: {
            icon: 'user-friends',
            className: 'mr-1 sidebar-icon'
        }
    },
    {
        text: 'searchPeople',
        link: '/search-people',
        component: FontAwesomeIcon,
        props: {
            icon: 'search',
            className: 'mr-1 sidebar-icon'
        }

    },
    {
        text: 'newsFeed',
        link: '/news',
        component: FontAwesomeIcon,
        props: {
            icon: 'newspaper',
            className: 'mr-1 sidebar-icon'
        }
    },
    {
        text: 'settings',
        link: '/settings',
        component: FontAwesomeIcon,
        props: {
            icon: 'cogs',
            className: 'mr-1 sidebar-icon'
        }
    },
];
