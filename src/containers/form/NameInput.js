import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REGEXPS } from '../../constants'

 class NameInput extends Component {
     constructor() {
         super();
         this.regExp = REGEXPS.name;

         this.handleChange = this.handleChange.bind(this);
         this.validation = this.validation.bind(this);
         this.setWaitingStatus = this.setWaitingStatus.bind(this);
     }
     validation() {
         this.props.validate(this.regExp.test(this.props.name.value))
     }
     handleChange(e) {
         let value = e.target.value;

         this.props.addValue(value);
     }
     setWaitingStatus() {
         this.props.validate('waiting');
     }
    render() {
         let stateClass;
        if (this.props.name.isValid) {
            stateClass = 'is-valid';
        }  else {
            stateClass = 'is-invalid';
        }
         if (this.props.name.isValid === 'waiting') {
             stateClass = ''
         }

        return (
            <input
                type='name'
                className={`form-control ${stateClass}`}
                placeholder='Name'
                onChange={this.handleChange}
                onBlur={this.validation}
                onFocus={this.setWaitingStatus}
                data-toggle="tooltip"
                data-placement="top"
                title="What is your name?"
                value={this.props.name.value}
            />
        )
    }
}
function mapStateToProps(state) {
     return {
         name: state.form.name
     }
}
function mapDispatchToProps(dispatch) {
    return {
        addValue: (value) => dispatch({type: 'ADD_NAME', value}),
        validate: (status) => dispatch({type: 'VALIDATE_NAME', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NameInput)