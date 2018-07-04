import React, {Component} from "react";

export default class PostImgBlock extends Component {
    render() {
        if (this.props.images === '') {
            return null;
        }
        return(
            <div>
                { this.props.images.map((image, index) => {
                    return(
                        <div key={index} className="post-image-block">
                            <img src={image} alt=""/>
                        </div>
                    )
                })}
            </div>
        )
    }
}