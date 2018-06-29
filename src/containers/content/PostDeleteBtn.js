import React, {Component} from "react";
import { connect } from 'react-redux';
import './PostDeleteBtn.sass'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deletePost } from "../../actions";


class PostDeleteBtn extends Component {
    render() {
        return(
             <FontAwesomeIcon className='post-delete-btn' icon='trash-alt' onClick={this.props.deletePost.bind(this, { _id: this.props._id})}/>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deletePost: obj => dispatch(deletePost(obj)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDeleteBtn);