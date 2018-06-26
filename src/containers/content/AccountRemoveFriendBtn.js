import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class AccountAddFriendBtn extends Component {
    render() {
        return (
            <button type='button' className='btn btn-outline-danger'>
                Remove from friends
            </button>
        )
    }
}
function mapStateToProps(state) {

}
function mapToDispatchProps(dispatch) {

}