import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';

import Avatar from '../../../components/Avatar'
import GallerySlider from '../../../components/galleryModal/GallerySlider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './GalleryModal.sass';
import { ACTION_TYPES } from "../../../constants";

Modal.setAppElement('#root');

class GalleryModal extends Component {
    componentWillUnmount() {
        this.props.clearModal();
    }
    render() {
        return (
            <Modal
                isOpen={true}
                overlayClassName='gallery-modal-overlay'
                className='gallery-modal'
                contentLabel='Example Modal'
            >
                <div
                    className="modal-close-btn"
                    onClick={this.props.hideModal}
                >
                    <FontAwesomeIcon icon='times'/>
                </div>
                <div className="gallery-modal-body">
                    {this.props.galleryModal.images.length &&
                        <GallerySlider images={this.props.galleryModal.images} initialSlide={this.props.galleryModal.initialSlide}/>
                    }
                </div>
                <div className='gallery-modal-footer'>
                    <div className="container">
                        <div className="row align-items-center">
                            {this.props.galleryModal.user._id ?
                                <div className="modal-author-block col-4">
                                    <Link to={`/users/${this.props.galleryModal.user._id}`}>
                                        <div
                                            className="author-photo"
                                            onClick={this.props.hideModal}
                                        >
                                            <Avatar src={this.props.galleryModal.user.photo}/>
                                        </div>
                                    </Link>
                                    <div className="author-name pb-2">
                                        {`${this.props.galleryModal.user.name} ${this.props.galleryModal.user.surname}`}
                                    </div>
                                </div>
                                :
                                <div className='col-4'></div>
                            }
                            <div className="modal-photo-counter-block col-4 d-flex justify-content-center">
                                <Translate value='application.photos'/>
                            </div>
                            <div className="modal-icon-block col-4 d-flex justify-content-end">
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
function mapStateToProps(state) {
    return {
        galleryModal: state.galleryModal,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        hideModal: () => dispatch({type: ACTION_TYPES.HIDE_GALLERY_MODAL}),
        clearModal: () => dispatch({type: ACTION_TYPES.CLEAR_MODAL}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GalleryModal)