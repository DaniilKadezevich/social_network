import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUserByToken } from '../../actions'

import { withRouter } from 'react-router-dom';

import { Preloader } from '../../components/index'

class LoadingComponent extends Component {
    componentWillMount() {
        let token = localStorage.getItem('token');
        if (token) {
            this.props.getUserByToken(token);
        }
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
        getUserByToken: token => dispatch(getUserByToken(token))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingComponent));