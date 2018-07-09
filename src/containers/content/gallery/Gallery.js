import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-redux-i18n';

import './Gallery.sass'

import Waypoint from '../../../components/WaypointComponent'
import GalleryItem from '../../../components/gallery/GalleryItem'


import { getGalleryImages, removeGalleryImage, showModal } from "../../../actions";
import { ACTION_TYPES } from "../../../constants";

class Gallery extends Component {
    componentWillUnmount() {
        this.props.clearData();
    }
    showModal(index) {
        this.props.showModal(this.props.user, this.props.data.gallery, index);
    }
    render() {
        return(
            <div className='container'>
                <div className="row">
                    <div className="col-10 offset-1  gallery">
                        <div className="row gallery-header">
                            <div className="col">
                                <FontAwesomeIcon icon='images' className='mr-1'/>
                                <Translate value='application.photos'/>
                            </div>
                            <div className="col d-flex justify-content-end">

                                <button
                                    className='btn btn-light btn-sm'
                                    type='button'
                                    data-toggle="modal"
                                    data-target="#imageAdder"
                                >
                                    <Translate value='application.addPhoto'/>
                                </button>
                            </div>
                        </div>
                        <div className="row gallery-content">
                            {this.props.data.gallery.map((img, index) => {
                                return (
                                    <GalleryItem
                                        key={index}
                                        src={img}
                                        removeItem={this.props.removeImage.bind(this, index)}
                                        showModal={this.showModal.bind(this, index)}
                                    />
                                )
                            })}
                        </div>
                        <Waypoint
                            length={this.props.data.gallery.length}
                            stopLoad={this.props.data.stopLoad}
                            message='application.galleryIsEmpty'
                            onEnter={this.props.getImages.bind(this, this.props.data.index)}
                        />
                    </div>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        data: state.data,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getImages: index => dispatch(getGalleryImages(index)),
        removeImage: index => dispatch(removeGalleryImage(index)),
        clearData: () => {dispatch({type: ACTION_TYPES.CLEAR_DATA})},
        showModal: (user, images, index) => dispatch(showModal(user, images, index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Gallery)