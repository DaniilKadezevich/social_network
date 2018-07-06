import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery'
import { Translate } from 'react-redux-i18n';

import ImageAdderGallery from '../../../components/imageAdder/ImageAdderGallery';

import './ImageAdder.sass'
import {addGalleryImages} from "../../../actions";
import {ACTION_TYPES} from "../../../constants";
import { addImages } from '../../../functions'

class ImageAdder extends Component {
    constructor() {
        super();

        this.addImages = this.addImages.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        $(this.modal).on('hidden.bs.modal', (e) => {
            this.props.clearAdder();
        });
        $(this.modal).on('show.bs.modal', (e) => {
            this.props.clearAdder();
            $(this.publishBtn).prop('disabled', true);
        });
    }
    componentDidUpdate() {
        const isDisabled = !this.props.images.length;

        $(this.publishBtn).prop('disabled', isDisabled);
    }
    handleClick() {
        console.log('HE');
        this.props.addGalleryImages(this.props.images)
    }
    addImages(event) {
       addImages(event, this.props.addImages)
    }
    render() {
        return (
            <div className="modal fade" id="imageAdder" tabIndex="xx-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"
                 ref={modal => this.modal = modal}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="imageAdder">
                                <Translate value='application.uploadPhoto'/>
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row no-gutters">
                                <ImageAdderGallery
                                    images={this.props.images}
                                    inputHandler={() => this.imagesInput.click()}
                                    removeHandler={this.props.removeImage}
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <input
                                multiple
                                style={{display: 'none'}}
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="form-control-file"
                                id="gallery-images"
                                name='gallery-images'
                                ref={imagesInput => this.imagesInput = imagesInput}
                                onChange={this.addImages}
                            />
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.handleClick}
                                ref={publishBtn => this.publishBtn = publishBtn}
                            >
                                <Translate value='application.publish'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        images: state.imageAdder.images,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addImages: images => dispatch({type: ACTION_TYPES.ADD_ADDER_IMAGES, images}),
        removeImage: index => dispatch({type: ACTION_TYPES.REMOVE_ADDER_IMAGE, index}),
        clearAdder: () => dispatch({type: ACTION_TYPES.CLEAR_ADDER}),
        addGalleryImages: images => dispatch(addGalleryImages(images)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImageAdder);