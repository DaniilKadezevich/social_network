import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'


import { AuthenticatedComponent, LoadingComponent, RegistrationForm, LogInForm, HomePage  } from '../containers/index'


import './Main.sass'

export default class Main extends Component {
    render() {
        return (
            <LoadingComponent>
                <main className='main'>
                        <Switch>
                            <Route exact path='/registration' component={RegistrationForm}/>
                            <Route exact path='/login' component={LogInForm}/>
                            <AuthenticatedComponent>
                                <Route path='/' component={HomePage}/>
                            </AuthenticatedComponent>
                        </Switch>
                </main>
            </LoadingComponent>
        )
    }
}

