import React, { Component } from 'react';

import { EditBtn, AddFriendBtn, RemoveFriendBtn } from '../index'

export default class AccountEditBlock extends Component {
    render() {
        let Btn;
        this.props.isFriend ?  Btn = RemoveFriendBtn : Btn = AddFriendBtn ;
        if (this.props.edit) {
            Btn = EditBtn
        }
        return (
            <div className="actions">
                <Btn/>
            </div>
        )
    }
}