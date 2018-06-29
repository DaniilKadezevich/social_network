import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../actions';

import { Redirect, Link } from 'react-router-dom';

import './forms.sass'

import { validateLogInFormInputs } from "../../functions";

import { EmailInput, PasswordInput } from './index'

class LogInForm extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        let form = {...this.props.form};

        let {password, email} = form;

        if(validateLogInFormInputs(form)) {
            let formData = new FormData();

            formData.append('email', email.value);
            formData.append('password', password.value);

            this.props.logIn(formData)
        } else {
            this.setInvalidInputs(password, email)
        }
    }

    setInvalidInputs(email, password) {
        this.props.validatePassword(!(email.isValid === 'waiting' || !email.isValid));
        this.props.validateEmail(!(password.isValid === 'waiting' || !password.isValid));
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
                            <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>Log In</button>
                        </form>
                    </div>
                    <div className='rerender mt-3 col-4 text-center'>
                        Haven't got an account?
                        <Link to='/registration' onClick={this.props.clearForm}> Sign up</Link>
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
        clearForm: () => dispatch({type: 'CLEAR_FORM'}),
        validateEmail: status => dispatch({type: 'VALIDATE_EMAIL', status}),
        validatePassword: status => dispatch({type: 'VALIDATE_PASSWORD', status}),
        logIn: obj => dispatch(logIn(obj)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);