import React, { Component } from 'react';
import { connect } from 'react-redux';
import plusImg from '../../../images/plus.png'
import $ from 'jquery'

import ImageAdderItem from '../../../components/imageAdder/ImageAdderItem';

import './ImageAdder.sass'
import {addGalleryImages} from "../../../actions";

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
    }
    handleClick() {
        this.props.addGalleryImages(this.props.images)
    }
    addImages(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            let filePath = event.target.value;

            if(!allowedExtensions.exec(filePath)){
                event.target.value = '';

                return;
            }
            let file = event.target.files[i];

            let reader = new FileReader();

            reader.onload = (e) => {
                this.props.addImages(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    }
    render() {
        return (
            <div className="modal fade" id="imageAdder" tabIndex="xx-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"
                 ref={modal => this.modal = modal}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="imageAdder">Upload images</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row no-gutters">
                                <div className="image-adder-gallery">
                                    {this.props.images.map((img, index) => {
                                        return (
                                            <ImageAdderItem
                                                key={index}
                                                removeHandler={this.props.removeImage.bind(this, index)}
                                                src={img}
                                            />
                                        )
                                    })}

                                    <div
                                        onClick={() => this.imagesInput.click()}
                                        className="add-item-block"
                                        style={{backgroundImage: `url(${plusImg})`}}
                                    >

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
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
                            >
                                Publish
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
        addImages: images => dispatch({type: 'ADD_ADDER_IMAGES', images}),
        removeImage: index => dispatch({type: 'REMOVE_ADDER_IMAGE', index}),
        clearAdder: () => dispatch({type: 'CLEAR_ADDER'}),
        addGalleryImages: images => dispatch(addGalleryImages(images)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImageAdder);