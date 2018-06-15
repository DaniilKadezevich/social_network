import React, { Component } from 'react';
import './Header.sass'

export default class Header extends Component {

    render() {
        return (
            <header className='header'>
                <div className="container">
                    <div className="row">
                        <div className="col col-6">Header LOGO</div>
                        <div className="col col-6 d-flex justify-content-end">
                            Header
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}