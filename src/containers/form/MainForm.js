import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, editUser } from '../../actions'

import { Redirect, Link } from 'react-router-dom';

import './forms.sass';

import { validateRegFormInputs } from "../../functions";
import { REGEXPS } from "../../constants";

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

            this.props.edit ? this.props.editUser(formData) : this.props.signUp(formData);
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

    render() {
        if (this.props.isAuthorized && !this.props.edit) {
            return <Redirect to='/'/>
        }
        let btnText, size;
        if (this.props.edit) {
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
                    {!this.props.edit && (
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
        clearForm: () => dispatch({type: 'CLEAR_FORM'}),
        signUp: obj => dispatch(signUp(obj)),
        editUser: obj => dispatch(editUser(obj)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);