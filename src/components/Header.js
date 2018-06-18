import React, { Component } from 'react';

import './Header.sass'

import LogOut from '../containers/LogOut'

export default class Header extends Component {

    render() {
        return (
            <header className='header'>
                <div className="container">
                    <div className="row">
                        <div className="col col-6 d-flex align-items-center">Header LOGO</div>
                        <div className="col col-6 d-flex justify-content-end align-items-center">
                            <LogOut/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}