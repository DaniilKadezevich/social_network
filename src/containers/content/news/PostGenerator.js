import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, I18n } from 'react-redux-i18n';

import { connect } from 'react-redux';
import { ACTION_TYPES } from "../../../constants";
import { addPost, getAllPosts } from "../../../actions";
import { Link } from 'react-router-dom';

import Avatar from '../../../components/Avatar';
import './PostGenerator.sass'

class PostGenerator extends Component {
    constructor() {
        super();

        this.addText = this.addText.bind(this);
        this.addImage = this.addImage.bind(this);
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
    addImage(event) {
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
                this.props.addImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    }
    render() {
        return (
            <div className="row no-gutters">
                <div className="col-6 offset-3">
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
                             <div className="post-generator-image-gallery">
                                 { this.props.post.images.map((image, index) => {
                                     return (
                                         <div key={index} className="gallery-item">
                                             <FontAwesomeIcon className='remove-gallery-item' icon='times'
                                             onClick={this.props.removeImage.bind(this, index)}/>
                                             <img src={image} alt=""/>
                                         </div>
                                     )
                                 })}
                             </div>
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
                                    onChange={this.addImage}
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
        photo: state.user.photo,
        post: state.post,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addText: text => dispatch({type: ACTION_TYPES.ADD_POST_TEXT, text}),
        addImage: images => dispatch({type: ACTION_TYPES.ADD_POST_IMAGE, images}),
        removeImage: index => dispatch({type: ACTION_TYPES.REMOVE_POST_IMAGE, index}),
        clearFields: () => dispatch({type: ACTION_TYPES.CLEAR_POST_FIELDS}),
        addPost: (text, images) => dispatch(addPost(text, images)),
        getAllPosts: () => dispatch(getAllPosts()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostGenerator)