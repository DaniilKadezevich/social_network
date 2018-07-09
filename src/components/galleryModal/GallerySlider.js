import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SliderImgBlock from './SliderImgBlock';




export default class GallerySlider extends Component {
    render() {
        const settings = {
            fade: true,
            infinite: false,
            speed: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            initialSlide: this.props.initialSlide,
        };
        return (
            <Slider {...settings}>
                {this.props.images.map((img, index) => {
                    return (
                        <div key={index}>
                            <div className='d-flex justify-content-center'>
                                <SliderImgBlock src={img}/>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        )
    }
}