import React, { Component } from 'react';

import AccountEditBlock from './AccountEditBlock'

export default class AccountInfoBlock extends Component {
    render() {
        return (
            <div className="col-6">
                <div className="d-flex align-items-center justify-content-between">
                    <div className='user-name'>Dan Kadzevich</div>
                    <AccountEditBlock/>
                </div>
                <div className='user-email'>quinzyizi@gmail.com</div>
                <div className="row mt-3">
                    <div className="col-4">
                        <div className='user-gender'>Male</div>
                    </div>
                    <div className="col-4">
                        <div className='user-age'>15 y. o.</div>
                    </div>
                </div>
            </div>
        )
    }
}