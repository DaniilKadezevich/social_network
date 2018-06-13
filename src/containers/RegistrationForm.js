import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegistrationForm.sass'


export default class RegistrationForm extends Component {

    render() {
        return (
            <div className="regFormContainer offset-6 col-4">
                <form action="">
                    <div className=" form-group form-row">
                        <div className="col-6">
                            <input type="name" className="form-control" id="regName" placeholder="Name"/>
                        </div>
                        <div className="col-6">
                            <input type="name" className="form-control" id="regSurname" placeholder="Surname"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="name" className="form-control" id="regMiddleName" placeholder="Middle name"/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="regEmail" placeholder="Email"/>
                    </div>
                    <div className=" form-group form-row">
                        <div className="form-group col-6">
                            <label htmlFor="regAge">
                                 Age:
                            </label>
                            <input type="number" className="form-control" id="regAge" placeholder='Age'/>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="regGender">Gender:</label>
                            <div className="row d-flex justify-content-center mt-1">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="regGender" id="regGenderM" value="option1"/>
                                    <label className="form-check-label" htmlFor="regGenderM">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="regGender" id="regGenderF" value="option2"/>
                                    <label className="form-check-label" htmlFor="regGenderF">Female</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <fieldset className="form-group">
                        <div className="row">
                            <label htmlFor='regPhoto' className="col-form-label col-2 pt-0">Photo:</label>
                            <div className="col-10">
                                <input type="file" className="form-control-file" id="regPhoto"/>
                            </div>
                        </div>
                    </fieldset>
                    <div className="row d-flex justify-content-center">
                        <button className="btn btn-success" type="submit">Sing In</button>
                    </div>

                </form>
            </div>
        )
    }
}