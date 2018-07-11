import React, { Component } from 'react';
import img from '../images/add_photo.png';
import './Avatar.sass';

import { setSizeClass } from '../functions'


export default class Avatar extends Component {
    componentDidMount() {
        setSizeClass.bind(this)();
    }
    componentDidUpdate() {
        setSizeClass.bind(this)();
    }
    render() {
        return (
            <div className={`avatar-block ${this.props.class}`}>
                <img src={this.props.src} alt=""
                     ref={img => this.img = img}
                />
            </div>
        )
    }
}