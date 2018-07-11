import React, {Component} from "react";

export default class PostImgBlock extends Component {
    render() {
        if (this.props.images === '') {
            return null;
        }
        return(
            <div className='row no-gutters'>
                { this.props.images.map((image, index) => {
                    return(
                        <div key={index} className={`post-image-block`}>
                            <img className='img-fluid' src={image} alt=""/>
                        </div>
                    )
                })}
            </div>
        )
    }
}