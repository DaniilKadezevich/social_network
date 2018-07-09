import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom'

import { Account } from '../../index';
import { EditUser } from '../../index';
import {showModal} from "../../../actions";


class MyAccount extends Component {
    showModal() {
        this.props.showModal(this.props.user, this.props.user.photo, 0);
    }
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/edit`} component={EditUser}/>
                <Route render={() => <Account showModal={this.showModal.bind(this)} user={this.props.user} edit={true}/>}/>
            </Switch>
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
        showModal: (user, images, index) => dispatch(showModal(user, images, index)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccount));
