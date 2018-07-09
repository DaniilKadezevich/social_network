import React, { Component } from 'react';
import {setSizeClass} from "../../functions";


export default class SliderImgBlock extends Component {
    componentDidMount() {
        setSizeClass.bind(this)();
    }
    componentDidUpdate() {
        setSizeClass.bind(this)();
    }
    render() {
        return (
            <div className="slider-img-block-adaptive">
                <img src={this.props.src}
                     ref={img => this.img = img}
                />
            </div>
        )
    }
}