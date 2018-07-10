import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, editUser, setInvalidFields } from '../../actions';
import { Translate } from 'react-redux-i18n';

import { Redirect, Link } from 'react-router-dom';

import './forms.sass';

import { validateFormInputs } from "../../functions";

import { NameInput, SurnameInput, MiddleNameInput, EmailInput, AgeInput, GenderBlock, PhotoBlock } from './index'

class RegistrationForm extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        let form = {...this.props.form};
        delete form.password;
        if (validateFormInputs(form)) {
            let { gender, name, surname, middleName, email, age, photo } = form;

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
            this.props.setInvalidFields(form);
        }
    }
    render() {
        if (this.props.isAuthorized && !this.props.edit) {
            return <Redirect to='/'/>
        }
        const btnText = this.props.edit ? <Translate value="application.form.edit"/> : <Translate value="application.form.signIn"/>;

        return (
            <div className='container'>
                <div className="row align-items-center flex-column justify-content-center">
                    <div className={`form-container col-5 text-center`}>
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
                                    <AgeInput id="regAge"/>
                                </div>
                                <div className="form-group col-6">
                                    <GenderBlock name="regGender"/>
                                </div>
                            </div>
                            <PhotoBlock/>
                            <div className="row d-flex justify-content-center">
                                <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>
                                    {btnText}
                                </button>
                            </div>
                        </form>
                    </div>
                    {!this.props.edit && (
                        <div className='rerender mt-3 col-5 text-center'>
                            <Translate value='application.form.haventAnAcc'/>
                            <Link to='/login' onClick={this.props.clearForm}> <Translate value='application.form.logIn'/></Link>
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
        clearForm: () => dispatch({type: 'CLEAR_FORM'}),
        signUp: obj => dispatch(signUp(obj)),
        editUser: obj => dispatch(editUser(obj)),
        setInvalidFields: form => dispatch(setInvalidFields(form)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);