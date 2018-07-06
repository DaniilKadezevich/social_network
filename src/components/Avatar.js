import React, { Component } from 'react';
import img from '../images/add_photo.png';
import './Avatar.sass'

export default class Avatar extends Component {
    render() {
        const style = this.props.src ? {backgroundImage: `url(${this.props.src})`} : {backgroundImage: img};
        return (
            <div className={`avatar-block ${this.props.class}`} style={style}>
            </div>
        )
    }
}