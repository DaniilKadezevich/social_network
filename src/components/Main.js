import React, { Component } from 'react';
import RegistrationForm from '../containers/RegistrationForm';

import './Main.sass'

export default class Main extends Component {

    render() {
        return (
            <main className='main'>
                <RegistrationForm />
            </main>
        );
    }
}