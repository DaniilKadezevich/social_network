import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import './forms.sass';

import { validateRegFormInputs } from "../../functions";
import {preDelay, REGEXPS} from "../../constants";

import { NameInput, SurnameInput, MiddleNameInput, EmailInput, AgeInput, GenderBlock, PhotoBlock } from './index'

class RegistrationForm extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setInvalidInputs = this.setInvalidInputs.bind(this);
    }

    handleSubmit() {
        let form = {...this.props.form};

        let {gender, name, surname, middleName, email, age, photo} = form;

        if (validateRegFormInputs(form)) {
            let formData = new FormData();

            formData.append('photo', photo.file);
            formData.append('name', name.value);
            formData.append('surname', surname.value);
            formData.append('middleName', middleName.value);
            formData.append('email', email.value);
            formData.append('age', age.value);
            formData.append('gender', gender.value);

            this.props.force ? this.editUser(formData) : this.singUp(formData)
        } else {
            this.setInvalidInputs(gender, name, surname, middleName, email, age, photo)
        }
    }
    setInvalidInputs(gender, name, surname, middleName, email, age, photo) {
        this.props.validateGender(gender.value);
        this.props.validateName(REGEXPS.name.test(name.value));
        this.props.validateSurname(REGEXPS.surname.test(surname.value));
        this.props.validateMiddleName(REGEXPS.middleName.test(middleName.value) || !middleName.value);
        this.props.validateEmail(REGEXPS.email.test(email.value));
        this.props.validateAge(REGEXPS.age.test(age.value));
        this.props.validatePhoto(photo.file, 'No photo selected');
    }
    async editUser(obj) {
        let token = localStorage.getItem('token');

        this.props.startLoading();

        let response = await fetch('/edit-user',
            {
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                }),
                method: "POST",
                body: obj
            });

        let data = await response.json();

        if (data.isError){
            await setTimeout(() => {
                this.props.finishLoading();
                this.props.showNotification('danger', data.message, true);
            }, preDelay);
        } else {
            this.props.authorize(data.user);
            this.props.clearForm();
            await setTimeout(() => {
                this.props.finishLoading();
                this.props.showNotification('success', `You have successfully edited your profile`, true);
            }, preDelay);
        }
    }

    async singUp(obj) {
        this.props.startLoading();


        let response = await fetch('/sign-up',
            {
                method: "POST",
                body: obj
            });

        let data = await response.json();

        if (data.isError){
            await setTimeout(() => {
                this.props.finishLoading();
                this.props.showNotification('danger', data.message, true);
            }, preDelay);
        } else {
            this.props.authorize(data.user);
            localStorage.setItem("token", data.token);
            this.props.clearForm();
            await setTimeout(() => {
                this.props.finishLoading();
                this.props.showNotification('success', `You are successfully registered. Your password: ${data.user.password}`, false);
            }, preDelay);
        }
    }

    render() {
        if (this.props.isAuthorized && !this.props.force) {
            return <Redirect to='/'/>
        }
        let btnText, size;
        if (this.props.force) {
            btnText = 'Edit';
            size = 'col-5';
        } else {
            btnText = 'Sign In';
            size = 'col-4';
        }

        return (
            <div className='container'>
                <div className="row align-items-center flex-column justify-content-center">
                    <div className={`form-container ${size} text-center`}>
                        <form action="">
                            <div className=" form-group form-row">
                                <div className="col-6">
                                    <NameInput/>
                                </div>
                                <div className="col-6">
                                    <SurnameInput/>
                                </div>
                            </div>
                            <div className="form-group">
                                <MiddleNameInput/>
                            </div>
                            <div className="form-group">
                                <EmailInput/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label htmlFor="regAge">
                                        Age:
                                    </label>
                                    <AgeInput id="regAge"/>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="regGender">Gender:</label>
                                    <GenderBlock name="regGender"/>
                                </div>
                            </div>
                            <PhotoBlock/>
                            <div className="row d-flex justify-content-center">
                                <button className="btn btn-success" type="button" onClick={this.handleSubmit}>
                                    {btnText}
                                </button>
                            </div>
                        </form>
                    </div>
                    {!this.props.force && (
                        <div className='rerender mt-3 col-4 text-center'>
                            Have an account?
                            <Link to='/login' onClick={this.props.clearForm}> Log In </Link>
                        </div>
                    )}

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
        validateName: status => dispatch({type: 'VALIDATE_NAME', status}),
        validateSurname: status => dispatch({type: 'VALIDATE_SURNAME', status}),
        validateMiddleName: status => dispatch({type: 'VALIDATE_MIDDLE_NAME', status}),
        validateEmail: status => dispatch({type: 'VALIDATE_EMAIL', status}),
        validateAge: status => dispatch({type: 'VALIDATE_AGE', status}),
        validateGender: status => dispatch({type: 'VALIDATE_GENDER', status}),
        validatePhoto: (status, error) => dispatch({type: 'VALIDATE_PHOTO', status, error}),
        showNotification: (style, message, isTemporary) => dispatch({type: 'SHOW_NOTIFICATION', style, message, isTemporary}),
        authorize: user => dispatch({type: 'AUTHORIZE', user}),
        clearForm: () => dispatch({type: 'CLEAR_FORM'}),
        startLoading: () => dispatch({type: 'START_LOADING'}),
        finishLoading: () => dispatch({type: 'FINISH_LOADING'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);