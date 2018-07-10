import React, {Component} from "react";

import { PostHeader, PostContent} from './index';

export default class Post extends Component {
    render() {
        return(
            <div className="row no-gutters justify-content-center">
                <div className="col-7 post">
                    <div className="container">
                        <PostHeader post={this.props.post} edit={this.props.edit}/>
                        <PostContent post={this.props.post} showModal={this.props.showModal}/>
                    </div>
                </div>
            </div>
        )
    }
}