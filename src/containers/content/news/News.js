import React, { Component } from 'react';
import { connect } from 'react-redux';

import './News.sass'

import Waypoint from '../../../components/WaypointComponent'
import Post from '../../../components/posts/Post';
import PostGenerator from '../posts/PostGenerator'

import {getAllPosts, showModal} from "../../../actions";
import { ACTION_TYPES } from "../../../constants";

class News extends Component {
    componentWillUnmount() {
        this.props.clearData();
    }
    showModal(user, images, index) {
        this.props.showModal(user, images, index)
    }
    render() {
        return(
            <div className='container posts'>
                <PostGenerator/>
                    {this.props.posts.map((post, index) => {
                            let edit = (post.author === this.props.user_id);
                            let user = {photo: post.photo, name: post.name, surname: post.surname, _id: post.author};
                            return <Post key={index} post={post} edit={edit} showModal={this.showModal.bind(this, user, post.images)}/>
                        })
                    }

                <Waypoint
                    length={this.props.posts.length}
                    stopLoad={this.props.stopLoad}
                    message='application.noPosts'
                    onEnter={this.props.getAllPosts.bind(this, this.props.index)}
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        posts: state.data.posts,
        index: state.data.index,
        stopLoad: state.data.stopLoad,
        user_id: state.user._id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: index => dispatch(getAllPosts(index)),
        clearData: () => dispatch({type: ACTION_TYPES.CLEAR_DATA}),
        showModal: (user, images, index) => dispatch(showModal(user, images, index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(News)