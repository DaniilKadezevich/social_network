import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REGEXPS } from '../../../constants'

class SurnameInput extends Component {
    constructor() {
        super();
        this.regExp = REGEXPS.surname;

        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.setWaitingStatus = this.setWaitingStatus.bind(this);
    }
    handleChange(e) {
        let value = e.target.value;

        this.props.addValue(value);
    }
    validation() {
        this.props.surname.value = this.props.surname.value.trim();
        this.props.validate(this.regExp.test(this.props.surname.value))
    }
    setWaitingStatus() {
        this.props.validate('waiting');
    }
    render() {
        let stateClass;

        this.props.surname.isValid ?  stateClass = 'is-valid' :   stateClass = 'is-invalid';

        if (this.props.surname.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <div>
                <input
                    type="name"
                    className={`form-control ${stateClass}`}
                    placeholder="Surname"
                    onChange={this.handleChange}
                    onBlur={this.validation}
                    onFocus={this.setWaitingStatus}
                    value={this.props.surname.value}
                    id={this.props.id}
                />
                <div className='col-12'>
                    <div className="error-message">
                        {this.props.surname.error}
                    </div>
                </div>
            </div>


        )
    }
}
function mapStateToProps(state) {
    return {
        surname: state.form.surname
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addValue: (value) => dispatch({type: 'ADD_SURNAME', value}),
        validate: (status) => dispatch({type: 'VALIDATE_SURNAME', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurnameInput)