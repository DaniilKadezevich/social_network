import React, { Component } from 'react';
import { Translate, I18n } from 'react-redux-i18n';

import { connect } from 'react-redux';
import { ACTION_TYPES } from "../../../constants";
import {addPost, showModal} from "../../../actions";
import { addImages } from '../../../functions'
import { Link } from 'react-router-dom';

import Avatar from '../../../components/Avatar';
import ImageAdderGallery from '../../../components/imageAdder/ImageAdderGallery'

import './PostGenerator.sass'

class PostGenerator extends Component {
    constructor() {
        super();

        this.addText = this.addText.bind(this);
        this.addImages = this.addImages.bind(this);
        this.addPost = this.addPost.bind(this);
    }
    componentWillUnmount() {
        this.props.clearFields();
    }
    addPost() {
        this.props.addPost(this.props.post.text, this.props.post.images);
    }
    addText(e) {
        let text = e.target.value;

        this.props.addText(text);
    }
    addImages(event) {
        addImages(event, this.props.addImages);
    }
    showModal(index) {
        this.props.showModal(this.props.user, this.props.post.images, index);
    }
    render() {
        return (
            <div className="row no-gutters justify-content-center">
                <div className="col-7">
                <div className="post-generator">
                    <div className="container-fluid">
                        <div className="row post-generator-header no-gutters">
                            <div className="col-1 post-generator-header-photo">
                                <Link to='/account'> <Avatar class='avatar' src={this.props.photo}/> </Link>
                            </div>
                            <div className="col-10 post-generator-header-text">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder={I18n.t('application.whatsNew')}
                                    onChange={this.addText}
                                    value={this.props.post.text}
                                />
                            </div>
                        </div>
                        { !(!this.props.post.images.length) &&
                         <div className="row no-gutters">
                             <ImageAdderGallery
                                 images={this.props.post.images}
                                 removeHandler={this.props.removeImage.bind(this)}
                                 inputHandler={() => this.imagesInput.click()}
                                 showModal={this.showModal.bind(this)}
                             />
                         </div>
                        }
                        <div className="row post-generator-image-input no-gutters">
                            <div className="col-12">
                                <input
                                    multiple
                                    style={{display: 'none'}}
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    className="form-control-file"
                                    id="post-images"
                                    name='images'
                                    ref={imagesInput => this.imagesInput = imagesInput}
                                    onChange={this.addImages}
                                />
                                <button
                                    className='btn btn-primary btn-sm'
                                    type='button'
                                    onClick={() => this.imagesInput.click()}
                                >
                                    <Translate value='application.addImages'/>
                                </button>
                            </div>
                        </div>
                        { !(!this.props.post.text && !this.props.post.images.length) &&
                        <div className="row post-generator-publish">
                            <div className="col-12 d-flex justify-content-center">
                                <button type='button' className='btn btn-success btn-sm' onClick={this.addPost}>
                                    <Translate value='application.publish'/>
                                </button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        photo: state.user.photo,
        post: state.post,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addText: text => dispatch({type: ACTION_TYPES.ADD_POST_TEXT, text}),
        addImages: images => dispatch({type: ACTION_TYPES.ADD_POST_IMAGE, images}),
        removeImage: index => dispatch({type: ACTION_TYPES.REMOVE_POST_IMAGE, index}),
        clearFields: () => dispatch({type: ACTION_TYPES.CLEAR_POST_FIELDS}),
        addPost: (text, images) => dispatch(addPost(text, images)),
        showModal: (user, images, index) => dispatch(showModal(user, images, index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostGenerator)