import React, { Component } from 'react';
import { Translate } from 'react-redux-i18n';

import './UserBlock.sass'

import Avatar from '../Avatar';


export default class UserBlock extends Component {
    render() {
        return (
            <div className="row user-block align-items-center">
                <div className="col-2">
                    <Avatar class='avatar' src={this.props.user.photo}/>
                </div>
                <div className="col-4 search-user-info">
                    {`${this.props.user.name} ${this.props.user.surname}`}
                </div>
                <div className="col-2 search-user-info">
                    {this.props.user.age}
                </div>
                <div className="col-4 search-user-info">
                    <Translate value={`application.${[this.props.user.gender]}`}/>
                </div>
            </div>
        )
    }
}