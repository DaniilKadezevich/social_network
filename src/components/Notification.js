import React, { Component } from 'react';
import { connect } from 'react-redux'


import './Notification.sass'

class Notification extends Component {

    render() {
        const isShown = this.props.notification.isShown;

        return (
           <div>
                {isShown &&
                    <div className='notification'>
                        <div className={`alert alert-${this.props.notification.style} text-center alert-dismissible fade show`} role='alert'>
                            {this.props.notification.message}
                            <button type="button" className="close" onClick={this.props.hideNotification}>
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