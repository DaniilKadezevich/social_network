import React, { Component } from 'react';
import { connect } from 'react-redux';

import './GenderForm.sass'
import { ACTION_TYPES } from "../../../constants";

class GenderBlock extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        let gender = e.target.value;


        if (gender !== 'Male' && gender !== 'Female') {
            this.props.validate(false);
            return;
        }

        this.props.addGender(e.target.value);
    }
    render() {
        let stateClass;

        this.props.gender.isValid ? stateClass = 'border border-success' : stateClass = 'border border-danger';

        if (this.props.gender.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <div >
                <div className={`gender-wrapper d-flex justify-content-between  ${stateClass}`}>
                    <div onChange={this.handleChange} className="form-check form-check-inline m-0 ">
                        <input className="form-check-input" checked={this.props.gender.value === 'Male'} type="radio" name={this.props.name} id="regGenderM" value="Male"/>
                        <label className="form-check-label" htmlFor="regGenderM">Male</label>
                    </div>
                    <div onChange={this.handleChange} className="form-check form-check-inline m-0">
                        <input className="form-check-input" checked={this.props.gender.value === 'Female'} type="radio" name={this.props.name} id="regGenderF" value="Female"/>
                        <label className="form-check-label" htmlFor="regGenderF">Female</label>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="error-message">
                        {this.props.gender.error}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        gender: state.form.gender
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addGender: (gender) => dispatch({type: ACTION_TYPES.ADD_GENDER, gender}),
        validate: (status) => dispatch({type: ACTION_TYPES.VALIDATE_GENDER, status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GenderBlock)