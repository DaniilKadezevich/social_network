import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFriend } from "../../../actions";
import { Translate, I18n } from 'react-redux-i18n';
import {ACTION_TYPES} from "../../../constants";


class RemoveFriendBtn extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.showConfirmModal(I18n.t('application.confirm.areYouSure'), this.props.removeFriend.bind(this, { _id: this.props._id }), I18n.t('application.confirm.removeFriend'), I18n.t('application.removeM'));
    }
    render() {
        return (
            <button type='button' className='btn btn-outline-danger'
                    onClick={this.handleClick}
                    data-toggle="modal"
                    data-target="#confirmModal"
            >
                <Translate value='application.removeFriend'/>
            </button>
        )
    }
}
function mapStateToProps(state) {
    return {
        _id: state.data.displayedUser._id,
    };
}
function mapToDispatchProps(dispatch) {
    return {
        removeFriend: obj => dispatch(removeFriend(obj)),
        showConfirmModal: (text, callback, title, btnText) => dispatch({type: ACTION_TYPES.SHOW_CONFIRM_MODAL, text, callback, title, btnText}),
    };
}
export default connect(mapStateToProps, mapToDispatchProps)(RemoveFriendBtn)