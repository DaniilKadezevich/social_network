import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './Home.sass'
import { URLS } from "../constants";

import { UserAccount, MyAccount, FriendsList, SearchPeople, News, Settings, SidebarMenu, Gallery } from '../containers/index';


 export default class HomePage extends Component {
    render() {
        return(
            <div className='home-page-wrapper'>
                <div className="container-fluid">
                    <div className="row">
                        <SidebarMenu/>
                        <div className="col-10 content">
                            <Switch>
                                <Route path={URLS.ACCOUNT} component={MyAccount}/>
                                <Route path={URLS.FRIENDS} component={FriendsList}/>
                                <Route path={URLS.SEARCH_PEOPLE} component={SearchPeople}/>
                                <Route path={URLS.NEWS} component={News}/>
                                <Route path={URLS.SETTINGS} component={Settings}/>
                                <Route path={URLS.USER} component={UserAccount}/>
                                <Route path={URLS.GALLERY} component={Gallery}/>
                                <Route exact path={URLS.HOME} component={News}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
