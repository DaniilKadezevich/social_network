import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'

import './HomePage.sass'

import { sidebarMenu } from '../constants'

import UserAccount from './UserAccount';
import FriendsList from './FriendsList';
import SearchPeople from './SearchPeople';
import News from './News';
import Settings from './Settings';
import PrivateRoute from './PrivateRoute'

export default class HomePage extends Component {
    render() {
        const sidebarItems =  sidebarMenu.map((el, index) => (
            <Link key={index} to={el.link}>
                <li>{el.text}</li>
            </Link>
        ));
        return(
            <div className='home-page-wrapper'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 sidebar">
                            <ul className='sidebar-menu'>
                                {sidebarItems}
                            </ul>
                        </div>
                        <div className="col-10 content">
                            <Switch>
                                <PrivateRoute path='/account' component={UserAccount}/>
                                <PrivateRoute path='/friends' component={FriendsList}/>
                                <PrivateRoute path='/search-people' component={SearchPeople}/>
                                <PrivateRoute path='/news' component={News}/>
                                <PrivateRoute path='/settings' component={Settings}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}