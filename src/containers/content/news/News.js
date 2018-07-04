import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import InfiniteScroll from 'react-infinite-scroll-component';

import './News.sass'

import Post from '../../../components/posts/Post';
import DataPreloader from '../../../components/DataPreloader';
import PostGenerator from './PostGenerator'


import { getAllPosts } from "../../../actions";
import { ACTION_TYPES } from "../../../constants";



class News extends Component {
    componentWillMount() {
        this.props.getAllPosts(this.props.index);
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
                <InfiniteScroll
                    dataLength={this.props.posts.length} //This is important field to render the next data
                    next={this.props.getAllPosts.bind(this, this.props.index)}
                    hasMore={!this.props.stopLoad}
                    loader={
                        <div className='row p-3'>
                            <DataPreloader/>
                        </div>
                    }
                    >
                    {this.props.posts.map((post, index) => {
                        let edit = (post.author === this.props.user_id);
                        return <Post key={index} post={post} edit={edit}/>
                    })}
                </InfiniteScroll>
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
        removePosts: () => dispatch({type: ACTION_TYPES.REMOVE_POSTS}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(News)