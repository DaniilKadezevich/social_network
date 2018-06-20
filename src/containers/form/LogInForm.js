import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import './forms.sass'

import { validateLogInFormInputs } from "../../functions";

import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'

class LogInForm extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        this.props.clearForm();
    }
    handleSubmit(e) {
        e.preventDefault();
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
            this.props.showNotification('danger', data.message, true);
        } else {
            this.props.authorize(data.user);
            localStorage.setItem("token", data.token);
            this.props.showNotification('success', `Welcome back, ${data.user.name}`, true);
            this.props.clearForm();
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
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <EmailInput />
                            </div>
                            <div className="form-group">
                                <PasswordInput />
                            </div>
                            <button className="btn btn-primary" type="submit">Log In</button>
                        </form>
                    </div>
                    <div className='rerender mt-3 col-4 text-center'>
                        Haven't got an account?
                        <Link to='/registration'> Sign up</Link>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);