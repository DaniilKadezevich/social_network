import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REGEXPS } from '../../constants'

class PasswordInput extends Component {
    constructor() {
        super();
        this.regExp = REGEXPS.password;

        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.setWaitingStatus = this.setWaitingStatus.bind(this);
    }
    handleChange(e) {
        let value = e.target.value;

        this.props.addValue(value);
    }
    validation() {
        this.props.validate(this.regExp.test(this.props.password.value))
    }
    setWaitingStatus() {
        this.props.validate('waiting');
    }
    render() {
        let stateClass;

        this.props.password.isValid ?  stateClass = 'is-valid' :  stateClass = 'is-invalid';

        if (this.props.password.isValid === 'waiting') {
            stateClass = ''
        }

        return(
            <input
                type='password'
                className={`form-control ${stateClass} ${this.props.size}`}
                placeholder='Password'
                onChange={this.handleChange}
                onBlur={this.validation}
                onFocus={this.setWaitingStatus}
                value={this.props.password.value}
            />
        )
    }
}
function mapStateToProps(state) {
    return{
        password: state.form.password
    }
}
function mapDispatchToProps(dispatch) {
    return{
        addValue: (value) => dispatch({type: 'ADD_PASSWORD', value}),
        validate: (status) => dispatch({type: 'VALIDATE_PASSWORD', status}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordInput);
