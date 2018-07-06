import React, { Component } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class GalleryItem extends Component {
    constructor() {
        super();

        this.setSizeClass = this.setSizeClass.bind(this);
    }
    componentDidMount() {
        this.setSizeClass()
    }
    componentDidUpdate() {
        this.setSizeClass()
    }
    setSizeClass() {
        let img = new Image();
        let sizeClass;

        img.onload = (e) => {
            sizeClass = e.target.width < e.target.height ? 'vertical' : 'horizontal';
            $(this.img).removeClass();
            $(this.img).addClass(sizeClass);
        };
        img.src = this.props.src;
    }
    render() {
        return (
            <div className="gallery-item">
                <img src={this.props.src}
                     ref={img => this.img = img}
                />
                <FontAwesomeIcon
                    icon='times'
                    className='remove-image-btn'
                    onClick={this.props.removeItem}
                />
            </div>
        )
    }
}