import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fillFormFields } from "../../actions";
import { MainForm } from '../index'

class EditUser extends Component {
    componentWillMount() {
        this.props.fillFormFields(this.props.user);
    }

    render() {
        return (
            <MainForm edit={true}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        form: state.form,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fillFormFields: user => dispatch(fillFormFields(user)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);