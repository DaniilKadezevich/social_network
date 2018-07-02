import React, { Component } from 'react';
import { Translate } from 'react-redux-i18n';

export default class AccountContent extends Component {
    render() {
        return (
            <div className="user-account-posts">
                <div className="col d-flex justify-content-center">
                    <Translate value='application.noPosts'/>
                </div>
            </div>
        )
    }
}