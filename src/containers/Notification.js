import React, { Component } from 'react';
import { connect } from 'react-redux'


import './Notification.sass'

class Notification extends Component {
    hideNotification() {

        this.props.hideNotification();
    }
    render() {
        const isShown = this.props.notification.isShown;

        if (!isShown) {
            return null;
        }

        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        if (this.props.notification.isTemporary) {
            this.timerId = setTimeout(this.props.hideNotification, 4000);
        }

        return (
            <div className={`alert alert-${this.props.notification.style} text-center alert-dismissible fade show n-alert `} role='alert'>
                {this.props.notification.message}
                <button type="button" className="close" onClick={this.hideNotification.bind(this)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        notification: state.notification
    }
}
function mapDispatchToProps(dispatch) {
    return {
        hideNotification: () => dispatch({type: 'HIDE_NOTIFICATION'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification)