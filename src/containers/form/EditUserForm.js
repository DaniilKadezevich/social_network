import React, { Component } from 'react';

import { connect } from 'react-redux';

import { RegistrationForm } from '../index'

class EditUser extends Component {
    componentWillMount() {
        this.props.setName(this.props.user.name);
        this.props.setSurname(this.props.user.surname);
        this.props.setMiddleName(this.props.user.middleName);
        this.props.setEmail(this.props.user.email);
        this.props.setAge(this.props.user.age);
        this.props.setGender(this.props.user.gender);
        this.props.setPhoto(this.props.user.photo);
    }

    render() {

        return (
            <RegistrationForm force={true}/>
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
        setName: value => dispatch({type: 'ADD_NAME', value}),
        setSurname: value => dispatch({type: 'ADD_SURNAME', value}),
        setMiddleName: value => dispatch({type: 'ADD_MIDDLE_NAME', value}),
        setEmail: value => dispatch({type: 'ADD_EMAIL', value}),
        setAge: value => dispatch({type: 'ADD_AGE', value}),
        setGender: gender => dispatch({type: 'ADD_GENDER', gender}),
        setPhoto: file => dispatch({type: 'ADD_PHOTO', file}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);