import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import RegistrationForm from '../containers/form/RegistrationForm';
import LogInForm from '../containers/form/LogInForm';


import './Main.sass'

export default class Main extends Component {

    render() {
        return (
            <main className='main'>
                <div className="container">
                    <div className="row">
                        <Switch>
                            <Route exact path="/" component={RegistrationForm}/>
                            <Route path="/login" component={LogInForm}/>
                        </Switch>
                    </div>
                </div>
            </main>
        );
    }
}