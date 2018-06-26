import React, { Component } from 'react';
import { getUsers, addToFriends } from "../../actions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './SearchPeople.sass';

import UserBlock from '../../components/search/UserBlock';

class SearchPeople extends Component {
    componentDidMount() {
        if (!this.props.users.length) {
            let token = localStorage.getItem('token');

            if (token) {
                this.props.getUsers(token)
            }
        }
    }
    componentWillUnmount() {
        this.props.removeUsers();
    }
    handleChange(e) {
        let regexp;
        try {
            regexp = new RegExp(`^${e.target.value.trim()}`, 'i');
        } catch(e) {
            regexp = /.\*/
        }

        let token = localStorage.getItem('token');
        this.props.getUsers(token, regexp)
    }
    render() {
        let content;
        this.props.users.length ? content = this.props.users.map((el, index) => {
            return <Link key={index} to={`/users/${el._id}`}> <UserBlock user={el}/> </Link>
        }) : content = (
            <div className='col d-flex justify-content-center p-3'>
                No results
            </div>);

        return (
            <div className="container">
                <div className="row search-header">
                    <div className="col-6 offset-3">
                        <input className='form-control search-input' type="text" placeholder='Search' onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
                {content}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        users: state.data.users,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getUsers: (token, regexp) => dispatch(getUsers(token, regexp)),
        removeUsers: () => dispatch({type: 'REMOVE_USERS'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPeople);