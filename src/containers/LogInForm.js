import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'

class LogInForm extends Component {
    render() {
        return(
            <form className='form-inline'>
                <div className="form-group">
                    <EmailInput size='form-control-sm'/>
                </div>
                <div className="form-group">
                    <PasswordInput size='form-control-sm'/>
                </div>
                <button className="btn btn-primary" type="submit">Log In</button>
            </form>
        )
    }
}

export default connect()(LogInForm);