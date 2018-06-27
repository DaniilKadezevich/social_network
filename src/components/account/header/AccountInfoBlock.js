import React, { Component } from 'react';

import AccountActionsBlock from './AccountActionsBlock'

export default class AccountInfoBlock extends Component {
    render() {

        return (
            <div className="col-6">
                <div className="d-flex align-items-center justify-content-between">
                    <div className='user-name'>{`${this.props.user.name} ${this.props.user.surname} ${this.props.user.middleName}`}</div>
                     <AccountActionsBlock edit={this.props.edit} isFriend={this.props.user.isFriend}/>
                </div>
                <div className='user-email'>{this.props.user.email}</div>
                <div className="row mt-3">
                    <div className="col-4">
                        <div className='user-gender'>{this.props.user.gender}</div>
                    </div>
                    <div className="col-4">
                        <div className='user-age'>{this.props.user.age} y. o.</div>
                    </div>
                </div>
            </div>
        )
    }
}