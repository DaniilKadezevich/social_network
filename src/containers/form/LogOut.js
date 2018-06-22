import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom'

class LogOut extends Component {
    logOut() {
        localStorage.clear();
        this.props.logOut();
    }
    render() {
        if (!this.props.user.isAuthorized) {
            return(
                <div></div>
            )
        }
        return(
            <Link onClick={this.logOut} to='/login'>
                <button className="btn btn-primary">
                    Log out
                </button>
            </Link>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch({type: 'LOG_OUT'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogOut);