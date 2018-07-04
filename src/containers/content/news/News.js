import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import Waypoint from 'react-waypoint';

import './News.sass'

import Post from '../../../components/posts/Post';
import DataPreloader from '../../../components/DataPreloader';
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
                    })}

                {!this.props.stopLoad ?
                    <div>
                        <Waypoint
                            onEnter={this.props.getAllPosts.bind(this, this.props.index)}
                        />
                        <div className='p-4'>
                            <DataPreloader/>
                        </div>
                    </div>
                    :
                    !this.props.posts.length &&
                        <div className='container'>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                     <Translate value='application.noPosts'/>
                                </div>
                            </div>
                        </div>
                }
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