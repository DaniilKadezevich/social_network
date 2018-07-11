import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setSizeClass } from '../../functions'

import './ImageAdderItem.sass'

export default class GalleryAdderItem extends Component {
    componentWillMount() {
       setSizeClass.bind(this)()
    }
    render() {
        return(
            <div className='image-adder-item'>
                <img src={this.props.src} alt=""
                     ref={ img => this.img = img }
                />
                <FontAwesomeIcon
                    className='remove-image-adder-item' icon='times'
                    onClick={this.props.removeHandler}
                />
            </div>
        )
    }
}