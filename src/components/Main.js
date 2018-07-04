import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'


import { AuthenticatedComponent, LoadingComponent, MainForm, LogInForm, Home  } from '../containers/index'


import './Main.sass'

export default class Main extends Component {
    render() {
        return (
            <LoadingComponent>
                <main className='main'>
                        <Switch>
                            <Route exact path='/registration' component={MainForm}/>
                            <Route exact path='/login' component={LogInForm}/>
                            <AuthenticatedComponent>
                                <Route path='/' component={Home}/>
                            </AuthenticatedComponent>
                        </Switch>
                </main>
            </LoadingComponent>
        )
    }
}

