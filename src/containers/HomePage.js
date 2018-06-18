import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './HomePage.sass'

export default class HomePage extends Component {
    render() {
        console.log(this.props.user);
        return(
            <div className='home-page-wrapper'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 sidebar">
                            <ul className='sidebar-menu'>
                                <Link to='/'>
                                    <li>My account</li>
                                </Link>
                                <Link to='/'>
                                    <li>Friends</li>
                                </Link>
                                <Link to='/'>
                                    <li>Search people</li>
                                </Link>
                                <Link to='/'>
                                    <li>News feed</li>
                                </Link>
                                <Link to='/'>
                                    <li>Settings</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="col-10 content">
                            Hello
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}