import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Preloader from '../../components/Preloader'
import { preDelay } from "../../constants";


class LoadingComponent extends Component {
    componentWillMount() {
        let token = localStorage.getItem('token');
        if (token) {
            this.props.startLoading();
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

        if (data.isError) {
            console.log('error');
        } else {
            this.props.authorize(data.user);
        }
        setTimeout(this.props.finishLoading, preDelay)

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
        authorize: (user) => dispatch({type: 'AUTHORIZE', user}),
        startLoading: () => dispatch({type: 'START_LOADING'}),
        finishLoading: () => dispatch({type: 'FINISH_LOADING'}),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingComponent));