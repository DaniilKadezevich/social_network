import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import RegistrationForm from '../containers/form/RegistrationForm';
import LogInForm from '../containers/form/LogInForm';
import HomePage from '../containers/HomePage';


import './Main.sass'

class Main extends Component {

    render() {
        return (
            <main className='main'>
                <Switch>
                    <Route exact path='/' render={ () => (
                        this.props.user.isAuthorized ? (
                            <HomePage user={this.props.user}/>
                        ) : (
                            <Redirect to='/registration'/>
                        )
                    )}
                    />
                    <Route exact path="/registration" render={ () => (
                        this.props.user.isAuthorized ? (
                            <Redirect to='/'/>
                        ) : (
                            <RegistrationForm />
                        )
                    )}
                    />
                    <Route exact path="/login" render={ () => (
                        this.props.user.isAuthorized ? (
                            <Redirect to='/'/>
                        ) : (
                            <LogInForm />
                        )
                    )}
                    />
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

export default withRouter(connect(mapStateToProps)(Main));

