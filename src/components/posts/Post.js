import React, {Component} from "react";

import { PostHeader, PostContent} from './index';

export default class Post extends Component {
    render() {
        return(
            <div className="row no-gutters">
                <div className="col-6 offset-3 post">
                    <div className="container">
                        <PostHeader post={this.props.post} edit={this.props.edit}/>
                        <PostContent post={this.props.post}/>
                    </div>
                </div>
            </div>
        )
    }
}