import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'

import './HomePage.sass'

import { sidebarMenu } from '../constants'


import { UserAccount, FriendsList, SearchPeople, News, Settings } from './index'
import { Avatar }  from '../components/index'

export default class HomePage extends Component {
    render() {
        const sidebarItems =  sidebarMenu.map((el, index) => (
            <Link key={index} to={el.link}>
                <li className='d-flex align-items-center'> {el.component} {el.text}</li>
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
                                <Route path='/account' component={UserAccount}/>
                                <Route path='/friends' component={FriendsList}/>
                                <Route path='/search-people' component={SearchPeople}/>
                                <Route path='/news' component={News}/>
                                <Route path='/settings' component={Settings}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}