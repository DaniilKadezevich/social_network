import React, { Component } from 'react';

import { Avatar } from '../../index';

export default class AccountPhotoBlock extends Component {
    render() {
        return (
            <div className=" col-4 d-flex justify-content-center">
                <div
                    className="user-account-photo-block"
                    onClick={this.props.showModal}
                >
                    <Avatar class='avatar-big' src={this.props.src}/>
                </div>
            </div>
        )
    }
}