import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import {ACTION_TYPES, REGEXPS} from '../../../constants'

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
        this.props.validate(this.regExp.test(this.props.password.value), I18n.t('application.form.errors.passwordErr'))
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
            <div>
                <input
                    type='password'
                    className={`form-control ${stateClass} ${this.props.size}`}
                    placeholder={ I18n.t('application.form.password')}
                    onChange={this.handleChange}
                    onBlur={this.validation}
                    onFocus={this.setWaitingStatus}
                    value={this.props.password.value}
                />
                <div className='col-12'>
                    <div className="error-message">
                        {this.props.password.error}
                    </div>
                </div>
            </div>
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
        addValue: (value) => dispatch({type: ACTION_TYPES.ADD_PASSWORD, value}),
        validate: (status, error) => dispatch({type: ACTION_TYPES.VALIDATE_PASSWORD, status, error}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordInput);
