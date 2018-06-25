import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './Home.sass'

import { UserAccount, FriendsList, SearchPeople, News, Settings, SidebarMenu } from './index';


 export default class HomePage extends Component {
    render() {
        return(
            <div className='home-page-wrapper'>
                <div className="container-fluid">
                    <div className="row">
                        <SidebarMenu/>
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