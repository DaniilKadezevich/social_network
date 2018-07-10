import React, {Component} from "react";

export default class PostImgBlock extends Component {
    render() {
        if (this.props.images === '') {
            return null;
        }
        return(
            <div className='row no-gutters'>
                { this.props.images.map((image, index) => {
                    if (index >= 2) {
                        return null;
                    }
                    return(
                        <div key={index}
                             className={`post-image-block`}
                             onClick={() => {this.props.showModal(index)}}
                        >
                            <img className='img-fluid' src={image} alt=""/>
                        </div>
                    )
                })}
                <div className='post-image-counter d-flex justify-content-center align-items-center'
                     onClick={() => this.props.showModal(2)}
                >
                    +{this.props.images.length - 2}
                </div>
            </div>
        )
    }
}