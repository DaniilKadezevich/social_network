import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component {
    componentDidUpdate() {
        if (!this.props.user.isAuthorized && !this.props.loading.isLoading) {
            this.props.history.push('/registration')
        }
    }
    render() {
        const { user, children } = this.props;
        return user.isAuthorized ? children : null;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        loading: state.loading,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        authorize: (user) => dispatch({type: 'AUTHORIZE', user}),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent))