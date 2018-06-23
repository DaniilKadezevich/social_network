import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import './forms.sass'

import { validateLogInFormInputs } from "../../functions";
import { preDelay } from "../../constants";

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
            let obj = {
                email: email.value,
                password: password.value,
            };
            this.logIn(obj)
        } else {
            this.setInvalidInputs(password, email)
        }
    }
    async logIn(obj) {
        this.props.startLoading();

        let response = await fetch("log-in",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",

                body: JSON.stringify(obj),
            });

        let data = await response.json();

        if (data.isError){
            await setTimeout(() => {
                this.props.finishLoading();
                this.props.showNotification('danger', data.message, true);
            }, preDelay)
        } else {
            this.props.authorize(data.user);
            localStorage.setItem("token", data.token);
            this.props.clearForm();
            await setTimeout(() => {
                this.props.finishLoading();
                this.props.showNotification('success', `Welcome back, ${data.user.name}`, true);
            }, preDelay)
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
        authorize: user => dispatch({type: 'AUTHORIZE', user}),
        clearForm: () => dispatch({type: 'CLEAR_FORM'}),
        validateEmail: status => dispatch({type: 'VALIDATE_EMAIL', status}),
        validatePassword: status => dispatch({type: 'VALIDATE_PASSWORD', status}),
        showNotification: (style, message, isTemporary) => dispatch({type: 'SHOW_NOTIFICATION', style, message, isTemporary}),
        startLoading: () => dispatch({type: 'START_LOADING'}),
        finishLoading: () => dispatch({type: 'FINISH_LOADING'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);