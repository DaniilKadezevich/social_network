import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Sidebar from './SettingsSidebar';
import Password from './Password';
import Language from './Language';

import './Settings.sass';
import {URLS} from "../../../constants";

export default class Settings extends Component {
    render() {
        return(
            <div className='container'>
                <div className="row">
                    <Sidebar history={this.props.history}/>
                    <div className="col-8 settings-content">
                        <Route path={URLS.SETTINGS_PASSWORD} component={Password}/>
                        <Route path={URLS.SETTINGS_LANGUAGE} component={Language}/>
                    </div>
                </div>
            </div>
        )
    }
}