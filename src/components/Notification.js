import React, { Component } from 'react';
import { connect } from 'react-redux'


import './Notification.sass'

class Notification extends Component {
    hideNotification() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.props.hideNotification()
    }
    render() {
        const isShown = this.props.notification.isShown;

        if (this.props.notification.isTemporary) {
            this.timerId = setTimeout(this.props.hideNotification, 2000);
        }

        return (
           <div>
                {isShown &&
                    <div className='notification'>
                        <div className={`alert alert-${this.props.notification.style} text-center alert-dismissible fade show`} role='alert'>
                            {this.props.notification.message}
                            <button type="button" className="close" onClick={this.hideNotification.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                }
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