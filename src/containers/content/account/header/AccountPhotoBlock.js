import React, { Component } from 'react';
import { Avatar } from '../../../../components/index';

export default class AccountPhotoBlock extends Component {
    render() {
        return (
            <div className=" col-4 d-flex justify-content-center">
                <div className="user-account-photo-block">
                    <Avatar class='avatar-big'/>
                </div>
            </div>
        )
    }
}