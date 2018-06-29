import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REGEXPS } from '../../../constants'

 class NameInput extends Component {
     constructor() {
         super();
         this.regExp = REGEXPS.name;

         this.handleChange = this.handleChange.bind(this);
         this.validation = this.validation.bind(this);
         this.setWaitingStatus = this.setWaitingStatus.bind(this);
     }
     validation() {
         this.props.name.value = this.props.name.value.trim();
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

        this.props.name.isValid ? stateClass = 'is-valid' :  stateClass = 'is-invalid';

         if (this.props.name.isValid === 'waiting') {
             stateClass = ''
         }

        return (
            <div>
                <input
                    type='name'
                    className={`form-control ${stateClass}`}
                    placeholder='Name'
                    onChange={this.handleChange}
                    onBlur={this.validation}
                    onFocus={this.setWaitingStatus}
                    value={this.props.name.value}
                    id={this.props.id}
                />
                <div className='col-12'>
                    <div className="error-message">
                        {this.props.name.error}
                    </div>
                </div>
            </div>
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