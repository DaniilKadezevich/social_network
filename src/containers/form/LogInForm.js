import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    handleSubmit(e) {
        e.preventDefault();
        let form = {...this.props.form};

        let {password, email} = form;

        if(validateLogInFormInputs(form)) {
            console.log(password, email);
        } else {
            this.setInvalidInputs(password, email)
        }
    }
    setInvalidInputs(email, password) {
        this.props.validatePassword(!(email.isValid === 'waiting' || !email.isValid));
        this.props.validateEmail(!(password.isValid === 'waiting' || !password.isValid));
    }
    render() {
        return(
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
                <Rerender handleClick={this.props.clearForm} path='/' message={'Haven\'t got an account?'} link='Sign up'/>
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        form: state.form,
        notification: state.notification,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        authorize: user => dispatch({type: 'AUTHORIZE', user}),
        clearForm: () => dispatch({type: 'CLEAR_FORM'}),
        validateEmail: status => dispatch({type: 'VALIDATE_EMAIL', status}),
        validatePassword: status => dispatch({type: 'VALIDATE_PASSWORD', status}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);