import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PhotoForm.sass'

class PhotoForm extends Component {
    constructor() {
        super();

        this.fileValidation = this.fileValidation.bind(this);
        this.sendError = this.sendError.bind(this);
    }
    sendError(message) {
        this.props.validate(message);
    }
    fileValidation(event) {
        let self = this;
        let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        let filePath = event.target.value;
        let file = event.target.files[0];
        let size;
        if (file){
            size = file.size
        }
        event.persist();

        if(!allowedExtensions.exec(filePath)){
            this.sendError('Incorrect file extension');
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
                            self.props.setPhotoPath(imgLink);
                        } else {
                            self.sendError('Width and Height must be 200px or more');
                            event.target.value = '';
                        }
                    };
                };
                reader.readAsDataURL(file);
            } else {
                this.sendError(`File size should be from 40000 to 5000000 bytes. Current is: ${size}`);
                event.target.value = '';
            }
        }
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
                <div className="row">
                    <label htmlFor='regPhoto' className="col-form-label col-2 pt-0">Photo:</label>
                    <div className="col-10">
                        <input type="file" onChange={this.fileValidation} className="form-control-file" id="regPhoto"/>
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
        setPhotoPath: (path) => dispatch({type: 'ADD_PHOTO', path}),
        validate: (message) => dispatch({type: 'VALIDATE_PHOTO', message})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PhotoForm)