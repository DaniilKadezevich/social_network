import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Sidebar from './SettingsSidebar';
import Password from './Password';
import Language from './Language';

import './Settings.sass';

export default class Settings extends Component {
    render() {
        return(
            <div className='container'>
                <div className="row">
                    <Sidebar history={this.props.history}/>
                    <div className="col-8 settings-content">
                        <Route path='/settings/password' component={Password}/>
                        <Route path='/settings/language' component={Language}/>
                    </div>
                </div>
            </div>
        )
    }
}