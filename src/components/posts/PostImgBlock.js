import React, {Component} from "react";

export default class PostImgBlock extends Component {
    render() {
        return(
            <div className="post-image-block">
                <img src={this.props.image} alt=""/>
            </div>
        )
    }
}