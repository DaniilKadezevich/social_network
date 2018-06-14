import React, { Component } from 'react';
import { connect } from 'react-redux';


 class NameForm extends Component {
     constructor() {
         super();

         this.handleChange = this.handleChange.bind(this);
         this.validation = this.validation.bind(this);
         this.setWaitingStatus = this.setWaitingStatus.bind(this);
     }
     validation() {
         if (/^[A-Z][a-z]{1,32}$/.test(this.props.name.text)) {
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
        addText: (text) => dispatch({type: 'ADD_NAME', text}),
        validate: (status) => dispatch({type: 'VALIDATE_NAME', status})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NameForm)