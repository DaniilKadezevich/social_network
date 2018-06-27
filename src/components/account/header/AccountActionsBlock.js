import React, { Component } from 'react';

import EditBtn from './AccountEditBtn'
import AddFriendBtn from '../../../containers/content/AddFriendBtn'
import RemoveFriendBtn from '../../../containers/content/RemoveFriendBtn'

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