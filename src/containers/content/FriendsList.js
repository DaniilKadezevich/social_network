import React, { Component } from 'react';
import { getFriends } from "../../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserBlock from '../../components/search/UserBlock';

import './FriendsList.sass'

class FriendsList extends Component {
    componentWillUnmount() {
        this.props.removeFriends();
    }
    render() {
        if (!this.props.friends.length) {
            let token = localStorage.getItem('token');

            if (token) {
                this.props.getFriends(token)
            }
        }

        let content;
        this.props.friends.length ? content = this.props.friends.map((el, index) => {
            return <Link key={index} to={`/users/${el._id}`}> <UserBlock user={el}/> </Link>
        }) : content = (
            <div className='row justify-content-center p-3'>
                You have no friends
            </div>);

        return(
            <div className='container'>
                <div className="row friends-header">
                    <div className="col-6 offset-3 text-center">
                        <h2 className='m-0'> Friends </h2>
                    </div>
                </div>
                {content}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        friends: state.data.users,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getFriends: token => dispatch(getFriends(token)),
        removeFriends: () => dispatch({type: 'REMOVE_USERS'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)