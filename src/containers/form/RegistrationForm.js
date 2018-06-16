import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './forms.sass';

import { validateRegFormInputs } from "../../functions";

import NameInput from './NameInput';
import SurnameInput from './SurnameInput';
import MiddleNameInput from './MiddleNameInput';
import EmailInput from './EmailInput';
import AgeInput from './AgeInput';
import GenderBlock from './GenderBlock';
import PhotoBlock from './PhotoBlock';
import Rerender from '../../components/Rerender';


class RegistrationForm extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setInvalidInputs = this.setInvalidInputs.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let form = {...this.props.form};

        let {gender, name, surname, middleName, email, age, photo} = form;

        if (validateRegFormInputs(form)) {
            let obj = {
                name: name.value,
                surname: surname.value,
                middleName: middleName.value,
                email: email.value,
                age: age.value,
                // photo: photo.file,
                gender: gender.value,
            };
            console.log(obj);
            this.fetchInfoTest(obj);
        } else {
            this.setInvalidInputs(gender, name, surname, middleName, email, age, photo)
        }
    }
    setInvalidInputs(gender, name, surname, middleName, email, age, photo) {
        this.props.validateGender(!(gender.isValid === 'waiting' || !gender.isValid));
        this.props.validateName(!(name.isValid === 'waiting' || !name.isValid));
        this.props.validateSurname(!(surname.isValid === 'waiting' || !surname.isValid));
        this.props.validateMiddleName(middleName.isValid);
        this.props.validateEmail(!(email.isValid === 'waiting' || !email.isValid));
        this.props.validateAge(!(age.isValid === 'waiting' || !age.isValid));
        this.props.validatePhoto(!(photo.isValid === 'waiting' || !photo.isValid));

    }
    async fetchInfoTest(obj) {

        let response = await fetch("post-info-test",
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
            this.props.showNotification('success', `You are successfully registered. Your password: ${data.user.password}`);
            this.props.clearForm();
        }

    }

    render() {
        return (
            <div className="form-container offset-4 col-4 text-center">
                <form onSubmit={this.handleSubmit} action="">
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
                        <button className="btn btn-success" type="submit">Sing In</button>
                    </div>
                </form>
                <Rerender handleClick={this.props.clearForm} message='Have an account?' path='/login' link='Log In'/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        form: state.form,
        notification: state.notification
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
        validatePhoto: (status, message) => dispatch({type: 'VALIDATE_PHOTO', status, message}),
        showNotification: (style, message) => dispatch({type: 'SHOW_NOTIFICATION', style, message}),
        authorize: user => dispatch({type: 'AUTHORIZE', user}),
        clearForm: () => dispatch({type: 'CLEAR_FORM'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);