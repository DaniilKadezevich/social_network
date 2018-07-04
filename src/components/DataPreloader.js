import React, { Component } from 'react';
import { Pulse } from 'react-preloading-component';

import './Preloader.sass'

export default class DataPreloader extends Component {
    render() {
        return(
            <Pulse color="#4469B0" />
        )
    }
}