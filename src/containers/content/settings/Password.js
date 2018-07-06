import React, {Component} from "react";
import { connect } from 'react-redux';
import { ACTION_TYPES } from "../../../constants";
import './Password.sass';
import {changePassword} from "../../../actions";
import { Link } from 'react-router-dom';
import { I18n, Translate } from 'react-redux-i18n';

import { Avatar } from '../../../components/index';


class Password extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillUnmount() {
        this.props.clearInputs();
    }
    handleClick() {
        this.props.changePassword(this.props.oldPassword, this.props.newPassword, this.props.confirmPassword)
    };
    handleChange(e) {
        let value = e.target.value;
        switch (e.target.name) {
            case 'old':
                this.props.addOldPassword(value);
                return;
            case 'new':
                this.props.addNewPassword(value);
                return;
            case 'confirm':
                this.props.addConfirmPassword(value);
                return;
            default:
                return;
        }
    }
    render() {
        return(
            <div className='container'>
                <div className="row">
                    <div className="col-8 offset-2 change-password">
                        <div className="user-line d-flex align-items-center justify-content-center">
                            <Link to='/account'> <Avatar class='avatar' src={this.props.user.photo}/> </Link>
                            <div className="user-name">{`${this.props.user.name} ${this.props.user.surname}`}</div>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className='form-control password-input'
                                placeholder={I18n.t('application.password.oldP')}
                                name='old'
                                onChange={this.handleChange}
                                value={this.props.oldPassword}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className='form-control password-input'
                                placeholder={I18n.t('application.password.newP')}
                                name='new'
                                onChange={this.handleChange}
                                value={this.props.newPassword}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className='form-control password-input'
                                placeholder={I18n.t('application.password.confirmP')}
                                name='confirm'
                                onChange={this.handleChange}
                                value={this.props.confirmPassword}
                            />
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={this.handleClick}
                                disabled={
                                    !(this.props.confirmPassword &&
                                    this.props.newPassword &&
                                    this.props.oldPassword)
                                }
                            >
                                <Translate value='application.password.changeP'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { oldPassword, newPassword, confirmPassword } = state.password;
    return {
        oldPassword,
        newPassword,
        confirmPassword,
        user: state.user,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addOldPassword: value => dispatch({type: ACTION_TYPES.ADD_OLD_PASSWORD, value}),
        addNewPassword: value => dispatch({type: ACTION_TYPES.ADD_NEW_PASSWORD, value}),
        addConfirmPassword: value => dispatch({type: ACTION_TYPES.ADD_CONFIRM_PASSWORD, value}),
        clearInputs: () => dispatch({type: ACTION_TYPES.CLEAR_PASSWORD_INPUTS}),
        changePassword: (oldP, newP, confirmP) => dispatch(changePassword(oldP, newP, confirmP))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Password);