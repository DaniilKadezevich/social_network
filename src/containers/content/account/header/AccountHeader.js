import React, { Component } from 'react';

import AccountPhotoBlock from './AccountPhotoBlock'
import AccountInfoBlock from './AccountInfoBlock'


export default class AccountHeader extends Component {
    render() {
        return (
            <div className="row user-account-header">
                <AccountPhotoBlock/>
                <AccountInfoBlock/>
            </div>
        )
    }
}