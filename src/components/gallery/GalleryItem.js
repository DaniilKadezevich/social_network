import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSizeClass } from "../../functions";


export default class GalleryItem extends Component {
    componentDidMount() {
        setSizeClass.bind(this)();
    }
    componentDidUpdate() {
        setSizeClass.bind(this)();
    }
    handleClick(e) {
        e.stopPropagation();

        this.props.removeItem();
    }
    render() {
        return (
            <div className="gallery-item"
                 onClick={this.props.showModal}
            >
                <img src={this.props.src}
                     ref={img => this.img = img}
                />
                <FontAwesomeIcon
                    icon='times'
                    className='remove-image-btn'
                    onClick={this.handleClick.bind(this)}
                />
            </div>
        )
    }
}