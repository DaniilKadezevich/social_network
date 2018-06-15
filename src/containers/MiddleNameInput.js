import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REGEXPS } from '../constants'

class MiddleNameInput extends Component {
    constructor() {
        super();
        this.regExp = REGEXPS.name;

        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.setWaitingStatus = this.setWaitingStatus.bind(this);
    }
    handleChange(e) {
        let value = e.target.value;

        this.props.addValue(value);
    }
    validation() {
        if (this.regExp.test(this.props.middleName.value) || this.props.middleName.value === '') {
            this.props.validate(true);
        } else {
            this.props.validate(false);
        }
    }
    setWaitingStatus() {
        this.props.validate('waiting');
    }
    render() {
        let stateClass;

        if (this.props.middleName.isValid) {
            stateClass = 'is-valid';
        }  else {
            stateClass = 'is-invalid';
        }
        if (this.props.middleName.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <input
                type="name"
                className={`form-control ${stateClass}`}
                placeholder="Middle Name"
                onChange={this.handleChange}
                onBlur={this.validation}
                onFocus={this.setWaitingStatus}
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        middleName: state.form.middleName
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addValue: (value) => dispatch({type: 'ADD_MIDDLE_NAME', value}),
        validate: (status) => dispatch({type: 'VALIDATE_MIDDLE_NAME', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MiddleNameInput)