import React, { Component } from 'react';
import { getUsers } from "../../actions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './SearchPeople.sass';

import Waypoint from '../../components/WaypointComponent'
import UserBlock from '../../components/search/UserBlock';
import SearchInput from './SearchInput';
import {ACTION_TYPES, URLS} from "../../constants";

class SearchPeople extends Component {
    componentWillUnmount() {
        this.props.clearData();
    }

    render() {
        return (
            <div className="container">
                <div className="row search-header">
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
                    onEnter={this.props.getUsers.bind(this, this.props.data.index, this.props.data.regexp)}
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
        getUsers: (index, regexp) => dispatch(getUsers(index, regexp, URLS.GET_USERS)),
        clearData: () => dispatch({type: ACTION_TYPES.CLEAR_DATA}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPeople);