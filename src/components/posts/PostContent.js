import React, {Component} from "react";

import PostTextBlock from './PostTextBlock'
import PostImgBlock from './PostImgBlock'

export default class PostContent extends Component {
    render() {
        return(
            <div className="row post-content">
                <div className="col">
                    <PostTextBlock text={this.props.post.text}/>
                    <PostImgBlock image={this.props.post.image}/>
                </div>
            </div>
        )
    }
}