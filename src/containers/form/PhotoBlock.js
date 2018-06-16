import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PhotoForm.sass'

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

        if (file){
            size = file.size;
            if(!allowedExtensions.exec(filePath)){
                this.validate(false, 'Incorrect file extension');
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
                                self.validate(false, 'Width and Height must be 200px or more');
                                event.target.value = '';
                            }
                        };
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.validate(false, `File size should be from 40000 to 5000000 bytes. Current is: ${size}`);
                    event.target.value = '';
                }
            }
        } else {
            console.log(file);
            this.props.validate(false, 'No photo selected')
        }
        event.persist();


    }
    render() {
        let statusClass;

        if (this.props.photo.isValid) {
            statusClass = 'border border-success';
        } else {
            statusClass = 'border border-danger'
        }
        if (this.props.photo.isValid === 'waiting') {
            statusClass = ''
        }
        return(
            <fieldset className={`form-group ${statusClass}`}>
                <div className="row d-flex align-items-center">
                    <div className=" col-6 d-flex justify-content-center">
                        <button className='btn btn-primary' type='button' onClick={() => this.photoInput.click()}>Upload photo</button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <input
                            style={{display: 'none'}}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onInput={this.fileValidation}
                            className="form-control-file"
                            id="regPhoto"
                            ref={photoInput => this.photoInput = photoInput}
                        />
                        <div className="img-block">
                            <img src={this.props.photo.file} alt=""/>
                        </div>
                    </div>
                </div>
            </fieldset>
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
        addPhotoFile: (file) => dispatch({type: 'ADD_PHOTO', file}),
        validate: (status, message) => dispatch({type: 'VALIDATE_PHOTO', status, message})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PhotoBlock)