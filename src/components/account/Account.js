import React, { Component } from 'react';

import './Account.sass'


import AccountHeader from './header/AccountHeader'
import AccountContent from './content/AccountContent'


export default class Account extends Component {
    render() {

        return (
            <div className='container user-account'>
                <AccountHeader user={this.props.user} edit={this.props.edit}/>
                <AccountContent post={'posts'}/>
            </div>
        )
    }
}