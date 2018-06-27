import React, { Component } from 'react';
import { connect } from 'react-redux';

import './News.sass'

import Post from '../../components/posts/Post'


import postImage from '../../images/post-1.jpg';



class News extends Component {
    render() {
        console.log(this.props.posts);
        let post = {
            text: 'Some text',
            image: postImage,
            photo: postImage,
            name: 'Dan',
            surname: 'Kadzevich',
            date: 'Yesterday, 6.00 p.m.'
        };
        return(
            <div className='container'>
                <Post post={post}/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        posts: state.data.posts,
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(News)