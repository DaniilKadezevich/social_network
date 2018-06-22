import React, { Component } from 'react';

import './Avatar.sass'

export default class Avatar extends Component {
    render() {
        return (
            <div className={`avatar-block ${this.props.class}`}>
                <img src={`${this.props.src}`} alt=''/>
            </div>
        )
    }
}