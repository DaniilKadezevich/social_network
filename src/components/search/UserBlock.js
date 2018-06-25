import React, { Component } from 'react';

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
                <div className="col-2 search-user-info">
                    {this.props.user.gender}
                </div>
                <div className="col-2 d-flex justify-content-end">
                    <button type='button' className='btn btn-outline-primary btn-sm'>Add to friends</button>
                </div>
            </div>
        )
    }
}