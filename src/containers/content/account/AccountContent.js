import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from '../../../components/posts/Post';
import PostGenerator from '../posts/PostGenerator'
import Waypoint from '../../../components/WaypointComponent'
import {getUsersPosts} from "../../../actions";
import {ACTION_TYPES} from "../../../constants";

class AccountContent extends Component {
    componentWillUnmount() {
        this.props.clearData();
    }
    render() {
        return (
            <div className="user-account-posts">
                {this.props.edit &&
                    <PostGenerator/>
                }
                {this.props.data.posts.map((post, index) => {
                    let edit = (post.author === this.props.user_id);
                    return <Post key={index} post={post} edit={edit}/>
                })
                }
                <Waypoint
                    length={this.props.data.posts.length}
                    stopLoad={this.props.data.stopLoad}
                    message='application.noPosts'
                    onEnter={this.props.getPosts.bind(this, this.props.data.index, this.props._id)}
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        data: state.data,
        user_id: state.user._id
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getPosts: (index, _id) => dispatch(getUsersPosts(index, _id)),
        clearData: () => dispatch({type: ACTION_TYPES.CLEAR_DATA}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountContent);