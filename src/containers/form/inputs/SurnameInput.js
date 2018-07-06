import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { ACTION_TYPES, REGEXPS } from '../../../constants'

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
        this.props.validate(this.regExp.test(this.props.surname.value), I18n.t('application.form.errors.required'))
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
                    placeholder={ I18n.t('application.form.surname')}
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
        addValue: (value) => dispatch({type: ACTION_TYPES.ADD_SURNAME, value}),
        validate: (status, error) => dispatch({type: ACTION_TYPES.VALIDATE_SURNAME, status, error})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurnameInput)