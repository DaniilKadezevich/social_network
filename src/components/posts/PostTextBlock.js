import React, {Component} from "react";

export default class PostTextBlock extends Component {
    render() {
        return(
            <div className="post-text-block">
                {this.props.text}
            </div>
        )
    }
}