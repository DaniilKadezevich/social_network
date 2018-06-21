import React, { Component } from 'react';
import { Eye } from 'react-preloading-component';

import './Preloader.sass'

export default class Preloader extends Component {
    render() {
        return(
            <div className='preloader'>
                <Eye color="#fff" />
            </div>
        )
    }
}