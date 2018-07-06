import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../actions';
import { I18n, Translate } from 'react-redux-i18n';

import { Redirect, Link } from 'react-router-dom';

import './forms.sass'

import { ACTION_TYPES, REGEXPS } from "../../constants";
import { validateFormInputs } from "../../functions";

import { EmailInput, PasswordInput } from './index'

class LogInForm extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        let form = {...this.props.form};

        let {password, email} = form;

        if(validateFormInputs({email, password})) {
            let formData = new FormData();

            formData.append('email', email.value);
            formData.append('password', password.value);

            this.props.logIn(formData)
        } else {
            this.setInvalidInputs(email, password)
        }
    }

    setInvalidInputs(email, password) {
        this.props.validatePassword(REGEXPS.password.test(password.value), I18n.t('application.form.errors.passwordErr'));
        this.props.validateEmail(REGEXPS.email.test(email.value), I18n.t('application.form.errors.emailError'));
    }

    render() {
        if (this.props.isAuthorized) {
            return <Redirect to='/'/>
        }

        return(
            <div className='container'>
                <div className="row flex-column align-items-center">
                    <div className='form-container col-4 text-center'>
                        <form >
                            <div className="form-group">
                                <EmailInput />
                            </div>
                            <div className="form-group">
                                <PasswordInput />
                            </div>
                            <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>
                                <Translate value='application.form.logIn'/>
                            </button>
                        </form>
                    </div>
                    <div className='rerender mt-3 col-4 text-center'>
                        <Translate value='application.form.haveAnAcc'/>
                        <Link to='/registration' onClick={this.props.clearForm}> <Translate value='application.form.signIn'/></Link>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        form: state.form,
        notification: state.notification,
        isAuthorized: state.user.isAuthorized,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        clearForm: () => dispatch({type: ACTION_TYPES.CLEAR_FORM}),
        validateEmail: (status, error) => dispatch({type: ACTION_TYPES.VALIDATE_EMAIL, status, error}),
        validatePassword: (status, error) => dispatch({type: ACTION_TYPES.VALIDATE_PASSWORD, status, error}),
        logIn: obj => dispatch(logIn(obj)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);