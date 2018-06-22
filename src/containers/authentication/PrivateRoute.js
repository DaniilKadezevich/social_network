import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
    render() {
        let Component = this.props.component;
        return (
            <Route render={(props) => (
                this.props.isAuthorized ?
                    <Component {...props} /> :
                    <Redirect to='/registration'/>
                )}
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        isAuthorized: state.user.isAuthorized,
    }
}
export default connect(mapStateToProps)(PrivateRoute);