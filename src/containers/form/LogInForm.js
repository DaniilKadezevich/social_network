import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './forms.sass'

import { validateLogInFormInputs } from "../../functions";

import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import Rerender from '../../components/Rerender'

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
            this.props.showNotification('danger', data.message);
        } else {
            this.props.authorize(data.user);
            this.props.showNotification('success', `Welcome back, ${data.user.name}`);
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
                <div className="row">
                    <div className='form-container  offset-4 col-4 text-center'>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <EmailInput />
                            </div>
                            <div className="form-group">
                                <PasswordInput />
                            </div>
                            <button className="btn btn-primary" type="submit">Log In</button>
                        </form>
                        <Rerender path='/' message={'Haven\'t got an account?'} link='Sign up'/>
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
        showNotification: (style, message) => dispatch({type: 'SHOW_NOTIFICATION', style, message}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);