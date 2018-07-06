import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { Link } from 'react-router-dom'

class LogOut extends Component {
    logOut() {
        localStorage.removeItem('token');
        this.props.logOut();
    }
    render() {
        if (!this.props.user.isAuthorized) {
            return null;
        }
        return(
            <Link onClick={this.logOut} to='/login'>
                <button className="btn btn-outline-light btn-sm">
                    <Translate value='application.logOut'/>
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