import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component {
    componentWillMount() {
        let token = localStorage.getItem('token');
        if (token) {
            this.getUserInfo(token);
        }
    }
    async getUserInfo(token) {
        let response = await fetch('/check-token', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
            })
        });
        let data = await response.json();

        if (data.isValid) {
            this.props.authorize(data.user);
        } else {
            console.log('error')
        }
    }
    render() {
        if (!this.props.user.isAuthorized){
            console.log(this.props.history.push('/registration'))
        }

        const { user, children } = this.props;
        return user.isAuthorized ? children : null;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        authorize: (user) => dispatch({type: 'AUTHORIZE', user})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent))