import React, { Component } from 'react';

import { AccountPhotoBlock, AccountInfoBlock } from '../index'

export default class AccountHeader extends Component {
    render() {
        return (
            <div className="row user-account-header">
                <AccountPhotoBlock showModal={this.props.showModal} src={this.props.user.photo}/>
                <AccountInfoBlock user={this.props.user} edit={this.props.edit}/>
            </div>
        )
    }
}