import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ACTION_TYPES, REGEXPS } from '../../../constants'

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
        this.props.middleName.value = this.props.middleName.value.trim();
        this.props.validate(this.regExp.test(this.props.middleName.value) || this.props.middleName.value === '')
    }
    setWaitingStatus() {
        this.props.validate('waiting');
    }
    render() {
        let stateClass;

        this.props.middleName.isValid ? stateClass = 'is-valid' : stateClass = 'is-invalid';

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
                value={this.props.middleName.value}
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
        addValue: (value) => dispatch({type: ACTION_TYPES.ADD_MIDDLE_NAME, value}),
        validate: (status) => dispatch({type: ACTION_TYPES.VALIDATE_MIDDLE_NAME, status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MiddleNameInput)