import React, { Component } from 'react';
import { Lines } from 'react-preloading-component';

import './Preloader.sass'

export default class DataPreloader extends Component {
    render() {
        return(
            <Lines color="#4469B0" />
        )
    }
}