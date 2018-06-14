import React, { Component } from 'react';
import { connect } from 'react-redux';

class EmailForm extends Component {
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
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                .test(this.props.email.text)) {
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

        if (this.props.email.isValid) {
            stateClass = 'is-valid';
        }  else {
            stateClass = 'is-invalid';
        }
        if (this.props.email.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <input
                type="email"
                className={`form-control ${stateClass}`}
                placeholder="Email"
                onChange={this.handleChange}
                onBlur={this.validation}
                onFocus={this.setWaitingStatus}
                data-toggle="tooltip"
                data-placement="top"
                title="Enter your email"
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        email: state.form.email
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addText: (text) => dispatch({type: 'ADD_EMAIL', text}),
        validate: (status) => dispatch({type: 'VALIDATE_EMAIL', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailForm)