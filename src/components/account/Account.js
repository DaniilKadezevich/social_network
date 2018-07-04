import React, { Component } from 'react';

import './Account.sass'

import { AccountHeader, AccountContent } from './index';


export default class Account extends Component {
    render() {
        return (
            <div className='container user-account'>
                <AccountHeader user={this.props.user} edit={this.props.edit}/>
                <AccountContent edit={this.props.edit} _id={this.props.user._id}/>
            </div>
        )
    }
}