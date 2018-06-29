import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'

import { uploadUser } from "../../actions";

import { Account } from '../index';


class UserAccount extends Component {
    componentWillMount() {
        let _id = this.props.match.params.userId;

        if (!this.props.displayedUser._id) {
            this.props.uploadUser({_id});
        }

    }

    componentWillUnmount() {
        this.props.removeUser();
    }

    render() {
        if (this.props.user._id === this.props.displayedUser._id) {
            return <Redirect to='/account'/>
        }
        return (
            <Account user={this.props.displayedUser} edit={false}/>
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
        removeUser: () => dispatch({type: 'REMOVE_USER_INFO'}),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAccount));