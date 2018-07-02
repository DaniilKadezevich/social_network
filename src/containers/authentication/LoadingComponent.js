import React, { Component } from 'react';
import { connect } from 'react-redux'
import {changeLocale, getUserByToken} from '../../actions'

import { withRouter } from 'react-router-dom';

import { Preloader } from '../../components/index'
import store from "../../store";

class LoadingComponent extends Component {
    componentWillMount() {
        this.props.getUserByToken();
    }

    render() {
        if (this.props.loading.isLoading) {
            return (
                <Preloader/>
            )
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        loading: state.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserByToken: () => dispatch(getUserByToken()),
        changeLocale: locale => dispatch(changeLocale(locale))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingComponent));