import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegistrationForm.sass';

import NameForm from './NameForm';
import SurnameForm from './SurnameForm';
import MiddleNameForm from './MiddleNameForm';
import EmailForm from './EmailForm';
import AgeForm from './AgeForm';
import GenderForm from './GenderForm';
import PhotoForm from './PhotoForm';

class RegistrationForm extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.form);
        let form = {...this.props.form};

        let gender = form.gender;
        let name = form.name;
        let surname = form.surname;
        let middleName = form.middleName;
        let email = form.email;
        let age = form.age;
        let photo = form.photo;

        if (gender.isValid === 'waiting' || !gender.isValid) {
            this.props.validateGender(false);
        }
        if (name.isValid === 'waiting' || !name.isValid) {
            this.props.validateName(false);
        }
        if (surname.isValid === 'waiting' || !surname.isValid) {
            this.props.validateSurname(false);
        }
        if (middleName.isValid === 'waiting' || !middleName.isValid) {
            this.props.validateMiddleName(false);
        }
        if (email.isValid === 'waiting' || !email.isValid) {
            this.props.validateEmail(false);
        }
        if (age.isValid === 'waiting' || !age.isValid) {
            this.props.validateAge(false);
        }
        if (photo.isValid === 'waiting' || !photo.isValid) {
            this.props.validatePhoto(false);
        }

        if (
            !(gender.isValid === 'waiting' || !gender.isValid) &&
            !(name.isValid === 'waiting' || !name.isValid) &&
            !(surname.isValid === 'waiting' || !surname.isValid) &&
            !(middleName.isValid === 'waiting' || !middleName.isValid) &&
            !(email.isValid === 'waiting' || !email.isValid) &&
            !(age.isValid === 'waiting' || !age.isValid) &&
            !(photo.isValid === 'waiting' || !photo.isValid)
        ) {
            let obj = {
                name: name.text,
                surname: surname.text,
                middleName: middleName.text,
                email: email.text,
                age: age.text,
                photo: photo.path,
                gender: gender.value,
            };
            console.log(obj);
        }
    }

    render() {
        return (
            <div className="regFormContainer offset-6 col-4">
                <form onSubmit={this.handleSubmit} action="">
                    <div className=" form-group form-row">
                        <div className="col-6">
                            <NameForm/>
                        </div>
                        <div className="col-6">
                           <SurnameForm/>
                        </div>
                    </div>
                    <div className="form-group">
                        <MiddleNameForm/>
                    </div>
                    <div className="form-group">
                        <EmailForm/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label htmlFor="regAge">
                                Age:
                            </label>
                            <AgeForm id="regAge"/>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="regGender">Gender:</label>
                            <GenderForm name="regGender"/>
                        </div>
                    </div>
                    <PhotoForm/>
                    <div className="row d-flex justify-content-center">
                        <button className="btn btn-success" type="submit">Sing In</button>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        form: state.form
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
        validatePhoto: status => dispatch({type: 'VALIDATE_PHOTO', status}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);