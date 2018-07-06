import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import './News.sass'

import Post from '../../../components/posts/Post';
import PostGenerator from './PostGenerator'


import { getAllPosts } from "../../../actions";
import { ACTION_TYPES } from "../../../constants";



class News extends Component {
    componentWillMount() {
        console.log('Get posts');
        this.props.getAllPosts();
    }
    componentWillUnmount() {
        this.props.removePosts();
    }
    render() {
        return(
            <div className='container'>
                <PostGenerator/>
                {
                    !this.props.posts.length &&
                    (
                    <div className='container'>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <Translate value='application.noPosts'/>
                            </div>
                        </div>
                    </div>
                    )
                }
                {this.props.posts.map((post, index) => {
                    let edit = (post.author === this.props.user_id);
                    return <Post key={index} post={post} edit={edit}/>
                })}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        posts: state.data.posts,
        user_id: state.user._id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
        removePosts: () => dispatch({type: ACTION_TYPES.REMOVE_POSTS}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(News)