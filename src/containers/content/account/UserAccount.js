import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import {showModal, uploadUser} from "../../../actions";

import { Account } from '../../index';
import {ACTION_TYPES} from "../../../constants";


class UserAccount extends Component {
    componentWillMount() {
        let _id = this.props.match.params.userId;

        if (this.props.user._id === _id) {
            this.props.history.push("/account");

            return;
        }

        if (!this.props.displayedUser._id) {
            this.props.uploadUser({_id});
        }
    }

    componentWillUnmount() {
        this.props.removeUser();
    }
    showModal() {
        this.props.showModal(this.props.displayedUser, this.props.displayedUser.photo, 0);
    }
    render() {
        return (
            <Account showModal={this.showModal.bind(this)} user={this.props.displayedUser} edit={false}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        displayedUser: state.data.displayedUser,
        user: state.user,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        uploadUser: _id => dispatch(uploadUser(_id)),
        removeUser: () => dispatch({type: ACTION_TYPES.REMOVE_USER_INFO}),
        showModal: (user, images, index) => dispatch(showModal(user, images, index)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAccount));