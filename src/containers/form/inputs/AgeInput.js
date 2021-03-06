import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { REGEXPS, ACTION_TYPES } from '../../../constants'

class AgeInput extends Component {
    constructor() {
        super();
        this.regExp = REGEXPS.age;

        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.setWaitingStatus = this.setWaitingStatus.bind(this);
    }
    validation() {
        this.props.validate(this.regExp.test(this.props.age.value), I18n.t('application.form.errors.ageError'));
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

        this.props.age.isValid ? stateClass = 'is-valid' :  stateClass = 'is-invalid';

        if (this.props.age.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <div>
                <input
                    type="number"
                    className={`form-control ${stateClass}`}
                    id={this.props.id}
                    placeholder={ I18n.t('application.form.age')}
                    onChange={this.handleChange}
                    onBlur={this.validation}
                    onFocus={this.setWaitingStatus}
                    value={this.props.age.value}
                />
                <div className='col-12'>
                    <div className="error-message">
                        {this.props.age.error}
                    </div>
                </div>
            </div>
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
        addValue: value => dispatch({type: ACTION_TYPES.ADD_AGE, value}),
        validate: (status, error) => dispatch({type: ACTION_TYPES.VALIDATE_AGE, status, error})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AgeInput)