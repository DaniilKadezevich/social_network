import React, {Component} from "react";

export default class PostImgBlock extends Component {
    render() {
        if (this.props.images === '') {
            return null;
        }
        return(
            <div className='row no-gutters'>
                { this.props.images.map((image, index) => {
                    // let size = this.props.images.length === 1 ? 'big' : 'small';
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