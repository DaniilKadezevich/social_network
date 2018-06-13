import React, { Component } from 'react';
import RegistrationForm from '../containers/RegistrationForm';

import './Main.sass'

export default class Main extends Component {

    render() {
        return (
            <main className='main'>
                <div className="container">
                    <div className="row">
                        <RegistrationForm />
                    </div>
                </div>
            </main>
        );
    }
}