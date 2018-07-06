import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
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
        this.props.validate(this.regExp.test(this.props.middleName.value) || this.props.middleName.value === '', I18n.t('application.form.errors.middleNameErr'))
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
            <div>
                <input
                    type="name"
                    className={`form-control ${stateClass}`}
                    placeholder={ I18n.t('application.form.middleName')}
                    onChange={this.handleChange}
                    onBlur={this.validation}
                    onFocus={this.setWaitingStatus}
                    value={this.props.middleName.value}
                />
                <div className='col-12'>
                    <div className="error-message">
                        {this.props.middleName.error}
                    </div>
                </div>
            </div>

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
        validate: (status, error) => dispatch({type: ACTION_TYPES.VALIDATE_MIDDLE_NAME, status, error})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MiddleNameInput)