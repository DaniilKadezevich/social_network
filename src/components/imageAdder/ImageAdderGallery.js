import React, { Component } from 'react';
import plusImg from '../../images/plus.png'

import ImageAdderItem from './ImageAdderItem';

import './ImageAdderItem.sass'

export default class ImageAdderGallery extends Component {
    render() {
        return(
            <div className="image-adder-gallery">
                {this.props.images.map((img, index) => {
                    return (
                        <ImageAdderItem
                            key={index}
                            removeHandler={this.props.removeHandler}
                            src={img}
                        />
                    )
                })}

                <div
                    onClick={this.props.inputHandler}
                    className="add-item-block"
                    style={{backgroundImage: `url(${plusImg})`}}
                >

                </div>
            </div>
        )
    }
}