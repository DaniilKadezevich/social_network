import React, { Component } from 'react';
import { connect } from 'react-redux';

import './News.sass'

import Waypoint from '../../../components/WaypointComponent'
import Post from '../../../components/posts/Post';
import PostGenerator from './PostGenerator'


import { getAllPosts } from "../../../actions";
import { ACTION_TYPES } from "../../../constants";



class News extends Component {
    componentWillUnmount() {
        this.props.clearData();
    }
    render() {
        return(
            <div className='container'>
                <PostGenerator/>
                    {this.props.posts.map((post, index) => {
                            let edit = (post.author === this.props.user_id);
                            return <Post key={index} post={post} edit={edit}/>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(News)