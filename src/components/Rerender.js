import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Rerender.sass'

export default class Rerender extends Component{
    render() {
        return(
            <div className='rerender mt-4'>
                {`${this.props.message} `}
                <Link to={this.props.path}>{this.props.link}</Link>
            </div>
        )
    }
}