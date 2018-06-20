import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import AuthenticatedComponent from './AuthenticatedComponent';
import PrivateRoute from './PrivateRoute'
import RegistrationForm from './form/RegistrationForm';
import LogInForm from './form/LogInForm';
import HomePage from './HomePage';


import './Main.sass'

class Main extends Component {
    render() {

        return (
            <main className='main'>
                <Switch>
                    <Route exact path='/registration' component={RegistrationForm}/>
                    <Route exact path='/login' component={LogInForm}/>
                    <AuthenticatedComponent>
                        <Route path='/' component={HomePage}/>
                    </AuthenticatedComponent>
                </Switch>
            </main>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authorize: (user) => dispatch({type: 'AUTHORIZE', user})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

