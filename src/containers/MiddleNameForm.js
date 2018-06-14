import React, { Component } from 'react';
import { connect } from 'react-redux';

class MiddleNameForm extends Component {
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
        if (/^[A-Z][a-z]{0,32}$/.test(this.props.middleName.text) || this.props.middleName.text === '') {
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

        if (this.props.middleName.isValid) {
            stateClass = 'is-valid';
        }  else {
            stateClass = 'is-invalid';
        }
        if (this.props.middleName.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <input
                type="name"
                className={`form-control ${stateClass}`}
                placeholder="Middle Name"
                onChange={this.handleChange}
                onBlur={this.validation}
                onFocus={this.setWaitingStatus}
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        middleName: state.form.middleName
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addText: (text) => dispatch({type: 'ADD_MIDDLE_NAME', text}),
        validate: (status) => dispatch({type: 'VALIDATE_MIDDLE_NAME', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MiddleNameForm)