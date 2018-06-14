import React, { Component } from 'react';
import { connect } from 'react-redux';

class AgeForm extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.validation = this.validation.bind(this);
        this.setWaitingStatus = this.setWaitingStatus.bind(this);
    }
    validation() {
        if (/^[1-9][0-9]?$/.test(this.props.age.text)) {
            this.props.validate(true);
        } else {
            this.props.validate(false);
        }
    }
    handleChange(e) {
        let text = e.target.value;

        this.props.addText(text);
    }
    setWaitingStatus() {
        this.props.validate('waiting');
    }
    render() {
        let stateClass;

        if (this.props.age.isValid) {
            stateClass = 'is-valid';
        }  else {
            stateClass = 'is-invalid';
        }
        if (this.props.age.isValid === 'waiting') {
            stateClass = ''
        }
        return(
            <input
                type="number"
                className={`form-control ${stateClass}`}
                id={this.props.id}
                placeholder='Age'
                onChange={this.handleChange}
                onBlur={this.validation}
                onFocus={this.setWaitingStatus}
                data-toggle="tooltip"
                data-placement="top"
                title="Enter your age"
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        age: state.form.age
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addText: (text) => dispatch({type: 'ADD_AGE', text}),
        validate: (status) => dispatch({type: 'VALIDATE_AGE', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AgeForm)