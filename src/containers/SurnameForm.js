import React, { Component } from 'react';
import { connect } from 'react-redux';


class SurnameForm extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.setWaitingStatus = this.setWaitingStatus.bind(this);
    }
    handleChange(e) {
        let text = e.target.value;

        this.props.addText(text);
    }
    validation() {
        if (/^[A-Z][a-z]{1,32}$/.test(this.props.surname.text)) {
            this.props.validate(true);
        } else {
            this.props.validate(false);
        }
    }
    setWaitingStatus() {
        this.props.validate('waiting');
    }
    render() {
        let stateClass;
        if (this.props.surname.isValid) {
            stateClass = 'is-valid';
        }  else {
            stateClass = 'is-invalid';
        }
        if (this.props.surname.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <input
                type="name"
                className={`form-control ${stateClass}`}
                placeholder="Surname"
                onChange={this.handleChange}
                onBlur={this.validation}
                onFocus={this.setWaitingStatus}
                data-toggle="tooltip"
                data-placement="top"
                title="What is your surname?"
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        surname: state.form.surname
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addText: (text) => dispatch({type: 'ADD_SURNAME', text}),
        validate: (status) => dispatch({type: 'VALIDATE_SURNAME', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurnameForm)