import React, { Component } from 'react';
import { getFriends } from "../../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';

import UserBlock from '../../components/search/UserBlock';

import './FriendsList.sass'

class FriendsList extends Component {
    componentWillMount() {
        this.props.getFriends()
    }
    componentWillUnmount() {
        this.props.removeFriends();
    }
    render() {
        let content;

        this.props.friends.length ? content = this.props.friends.map((el, index) => {
            return <Link key={index} to={`/users/${el._id}`}> <UserBlock user={el}/> </Link>
        }) : content = (
            <div className='row justify-content-center p-3'>
                <Translate value='application.noFriends'/>
            </div>);

        return(
            <div className='container'>
                <div className="row friends-header">
                    <div className="col-6 offset-3 text-center">
                        <h2 className='m-0'> <Translate value='application.friends'/> </h2>
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
        getFriends: () => dispatch(getFriends()),
        removeFriends: () => dispatch({type: 'REMOVE_USERS'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)