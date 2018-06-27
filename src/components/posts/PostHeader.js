import React, {Component} from "react";

import Avatar from '../Avatar';

export default class PostHeader extends Component {
    render() {
        return(
            <div className="row post-header no-gutters">
                <div className="col-1 mr-3">
                    <Avatar class='avatar' src={this.props.post.photo}/>
                </div>
                <div className="col-10 d-flex flex-column justify-content-center ">
                    <div className="post-header-name">{this.props.post.name} {this.props.post.surname}</div>
                    <div className="post-header-time">{this.props.post.date}</div>
                </div>
            </div>
        )
    }
}