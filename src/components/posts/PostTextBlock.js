import React, {Component} from "react";

export default class PostTextBlock extends Component {
    render() {
        if (!this.props.text) {
            return null;
        }
        return(
            <div className="post-text-block">
                {this.props.text}
            </div>
        )
    }
}