import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegistrationForm.sass'


class RegistrationForm extends Component {
    handleChange() {
        if (this.props.form.name.text) {
            this.props.validateName(true)
        } else {
            this.props.validateName(false)
        }

    }
    render() {
        let nameClass = 'form-control';
        if (this.props.form.name.isValid) {
            nameClass = 'form-control'
        } else {
            nameClass = 'form-control is-invalid'
        }
        return (
            <div className="regFormContainer offset-6 col-4">
                <form action="">
                    <div className=" form-group form-row">
                        <div className="col-6">
                            <input
                                type="name"
                                className={nameClass}
                                id="regName"
                                placeholder="Name"
                                onChange={this.props.addName.bind(this)}
                                onBlur={this.handleChange.bind(this)}
                            />
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
function mapStateToProps(state) {
    return {
        form: state.regForm
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addName: (e) => dispatch({type: 'ADD_NAME', payload: e.target.value}),
        validateName: (status) => dispatch({type: 'VALIDATE_NAME', payload: status}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);