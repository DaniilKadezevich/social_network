import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { addFriend } from "../../../actions";

class AddFriendBtn extends Component {
    render() {
        return (
            <button type='button' className='btn btn-outline-primary'
                    onClick={this.props.addFriend.bind(this, { _id: this.props._id})}
            >
                <Translate value='application.addFriend'/>
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
        addFriend: obj => dispatch(addFriend(obj))
    }
}
export default connect(mapStateToProps, mapToDispatchProps)(AddFriendBtn);