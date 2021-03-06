import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate, I18n } from 'react-redux-i18n';

import './PhotoForm.sass'

import { Avatar }  from '../../../components/index'
import { ACTION_TYPES } from "../../../constants";

class PhotoBlock extends Component {
    constructor() {
        super();

        this.fileValidation = this.fileValidation.bind(this);
    }
    fileValidation(event) {
        let self = this;
        let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        let filePath = event.target.value;
        let file = event.target.files[0];
        let size;

        event.persist();

        if (file){
            size = file.size;
            if(!allowedExtensions.exec(filePath)){
                this.props.validate(false, I18n.t('application.form.errors.fileExt'));
                event.target.value = '';
            } else {
                let img = new Image();

                if (size >= 40000 && size <= 5000000 ) {
                    let reader = new FileReader();

                    reader.onload = (e) => {
                        let imgLink = e.target.result;
                        img.src = imgLink;

                        img.onload = function() {
                            let width = this.width;
                            let height = this.height;

                            if (width >= 200 && height >= 200) {
                                self.props.addPhotoFile(imgLink);
                            } else {
                                self.props.validate(false, I18n.t('application.form.errors.wAndHError'));
                                event.target.value = '';
                            }
                        };
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.props.validate(false, I18n.t('application.form.errors.fileSize'));
                    event.target.value = '';
                }
            }
        } else {
            this.props.validate(false, I18n.t('application.form.errors.required'))
        }
    }
    render() {
        let statusClass;

        this.props.photo.isValid ? statusClass = 'border border-success' : statusClass = 'border border-danger';

        if (this.props.photo.isValid === 'waiting') {
            statusClass = ''
        }
        return(
            <div className={`form-group ${statusClass} photo-block`}>
                <div className='row align-items-center'>
                    <div className=" col-6 d-flex justify-content-center">
                        <button
                            className='btn btn-primary btn-sm'
                            type='button'
                            onClick={() => this.photoInput.click()}
                        >
                            <Translate value='application.form.photoBtn'/>
                        </button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <input
                            style={{display: 'none'}}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onInput={this.fileValidation}
                            className="form-control-file"
                            id="regPhoto"
                            name='avatar'
                            ref={photoInput => this.photoInput = photoInput}
                        />

                        <Avatar class='avatar-middle' src={this.props.photo.file}/>
                    </div>
                    {this.props.photo.error &&
                    <div className='col-12'>
                        <div className="error-message">
                            {this.props.photo.error}
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        photo: state.form.photo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addPhotoFile: (file) => dispatch({type: ACTION_TYPES.ADD_PHOTO, file}),
        validate: (status, error) => dispatch({type: ACTION_TYPES.VALIDATE_PHOTO, status, error})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PhotoBlock)