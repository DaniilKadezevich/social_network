import React, {Component} from "react";

import { PostTextBlock, PostImgBlock } from './index'

export default class PostContent extends Component {
    render() {
        return(
            <div className="row post-content">
                <div className="col">
                    <PostTextBlock text={this.props.post.text}/>
                    <PostImgBlock images={this.props.post.images}/>
                </div>
            </div>
        )
    }
}