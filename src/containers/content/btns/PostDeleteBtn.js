import React, {Component} from "react";
import { connect } from 'react-redux';
import './PostDeleteBtn.sass'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deletePost } from "../../../actions";
import {ACTION_TYPES} from "../../../constants";
import {I18n} from "react-redux-i18n";


class PostDeleteBtn extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.showConfirmModal(
            I18n.t('application.confirm.areYouSure'),
            this.props.deletePost.bind(this, { _id: this.props._id}),
            I18n.t('application.confirm.deletePost'),
            I18n.t('application.deleteM')
        );
    }
    render() {
        return(
             <FontAwesomeIcon className='post-delete-btn' icon='trash-alt'
                              data-toggle="modal"
                              data-target="#confirmModal"
                              onClick={this.handleClick}/>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deletePost: obj => dispatch(deletePost(obj)),
        showConfirmModal: (text, callback, title, btnText) => dispatch({type: ACTION_TYPES.SHOW_CONFIRM_MODAL, text, callback, title, btnText}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDeleteBtn);