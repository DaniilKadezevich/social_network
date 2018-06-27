import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFriend } from "../../actions";

class RemoveFriendBtn extends Component {
    render() {
        return (
            <button type='button' className='btn btn-outline-danger'
            onClick={this.props.removeFriend.bind(this, { _id: this.props._id })}
            >
                Remove from friends
            </button>
        )
    }
}
function mapStateToProps(state) {
    return {
        _id: state.data.displayedUser._id,
    };
}
function mapToDispatchProps(dispatch) {
    return {
        removeFriend: obj => dispatch(removeFriend(obj))
    };
}
export default connect(mapStateToProps, mapToDispatchProps)(RemoveFriendBtn)