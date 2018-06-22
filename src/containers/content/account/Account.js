import React, { Component } from 'react';

import './UserAccount.sass'


import AccountHeader from './header/AccountHeader'
import AccountContent from './content/AccountContent'


export default class Account extends Component {
    render() {
        return (
            <div className='container user-account'>
                <AccountHeader/>
                <AccountContent/>
            </div>
        )
    }
}