import React, { Component } from 'react';
import {getFriends, getUsers} from "../../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Translate} from 'react-redux-i18n';

import Waypoint from '../../components/WaypointComponent'
import UserBlock from '../../components/search/UserBlock';
import SearchInput from './SearchInput';

import './FriendsList.sass'
import {ACTION_TYPES, URLS} from "../../constants";

class FriendsList extends Component {
    componentWillUnmount() {
        this.props.clearData();
    }

    render() {
        return(
            <div className='container'>
                <div className="row friends-header">
                    <div className="col-6 offset-3">
                        <SearchInput/>
                    </div>
                </div>

                {this.props.data.users.map((el, index) => {
                        return <Link key={index} to={`/users/${el._id}`}> <UserBlock user={el}/> </Link>
                    })
                }

                <Waypoint
                    length={this.props.data.users.length}
                    stopLoad={this.props.data.stopLoad}
                    message='application.noResult'
                    onEnter={this.props.getFriends.bind(this, this.props.data.index, this.props.data.regexp)}
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        data: state.data,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getFriends: (index, regexp) => dispatch(getUsers(index, regexp, URLS.GET_FRIENDS)),
        clearData: () => dispatch({type: ACTION_TYPES.CLEAR_DATA}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)