import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REGEXPS } from '../../constants'

class AgeInput extends Component {
    constructor() {
        super();
        this.regExp = REGEXPS.age;

        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.setWaitingStatus = this.setWaitingStatus.bind(this);
    }
    validation() {
        this.props.validate(this.regExp.test(this.props.age.value));
    }
    handleChange(e) {
        let value = e.target.value;

        this.props.addValue(value);
    }
    setWaitingStatus() {
        this.props.validate('waiting');
    }
    render() {
        let stateClass;

        if (this.props.age.isValid) {
            stateClass = 'is-valid';
        }  else {
            stateClass = 'is-invalid';
        }
        if (this.props.age.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <input
                type="number"
                className={`form-control ${stateClass}`}
                id={this.props.id}
                placeholder='Age'
                onChange={this.handleChange}
                onBlur={this.validation}
                onFocus={this.setWaitingStatus}
                data-toggle="tooltip"
                data-placement="top"
                title={this.props.age.value}
                value={this.props.age.value}
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        age: state.form.age
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addValue: (value) => dispatch({type: 'ADD_AGE', value}),
        validate: (status) => dispatch({type: 'VALIDATE_AGE', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AgeInput)