import React, { Component } from 'react';
import { connect } from 'react-redux';

class PasswordInput extends Component {
    render() {
        let stateClass = '';
        return(
            <input
                type='password'
                className={`form-control ${stateClass} ${this.props.size}`}
                placeholder='Password'
            />
        )
    }
}

export default connect()(PasswordInput);
