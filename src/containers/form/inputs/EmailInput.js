import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REGEXPS, ACTION_TYPES } from '../../../constants'

class EmailInput extends Component {
    constructor() {
        super();
        this.regExp = REGEXPS.email;

        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.setWaitingStatus = this.setWaitingStatus.bind(this);
    }
    handleChange(e) {
        let value = e.target.value;

        this.props.addValue(value);
    }
    validation() {
        this.props.validate(this.regExp.test(this.props.email.value))
    }
    setWaitingStatus() {
        this.props.validate('waiting');
    }
    render() {
        let stateClass;

        this.props.email.isValid ? stateClass = 'is-valid' : stateClass = 'is-invalid';

        if (this.props.email.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <div>
                <input
                    type="email"
                    className={`form-control ${stateClass} ${this.props.size}`}
                    placeholder="Email"
                    onChange={this.handleChange}
                    onBlur={this.validation}
                    onFocus={this.setWaitingStatus}
                    value={this.props.email.value}
                />
                <div className='col-12'>
                    <div className="error-message">
                        {this.props.email.error}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        email: state.form.email
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addValue: value => dispatch({type: ACTION_TYPES.ADD_EMAIL, value}),
        validate: status => dispatch({type: ACTION_TYPES.VALIDATE_EMAIL, status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailInput)