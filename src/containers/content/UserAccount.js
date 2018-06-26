import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { uploadUser } from "../../actions";

import { Account } from '../index';


class UserAccount extends Component {
    componentWillMount() {
        let _id = this.props.match.params.userId;
        console.log(_id);
        if (!this.props.user.email) {
            this.props.uploadUser({_id});
        }

    }
    componentWillUnmount() {
        this.props.removeUser();
    }
    render() {
        return (
            <Account user={this.props.user} edit={false}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.data.displayedUser
    }
}
function mapDispatchToProps(dispatch) {
    return {
        uploadUser: _id => dispatch(uploadUser(_id)),
        removeUser: () => dispatch({type: 'REMOVE_USER_INFO'}),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAccount));