import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom'

import { Account } from '../index';
import { EditUser } from '../index';


class UserAccount extends Component {
    render() {

        return (
            <Switch>
                <Route path={`${this.props.match.url}/edit`} component={EditUser}/>
                <Route render={() => <Account user={this.props.user} edit={true}/>}/>
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default withRouter(connect(mapStateToProps)(UserAccount));
