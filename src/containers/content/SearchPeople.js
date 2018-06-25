import React, { Component } from 'react';
import { getUsers } from "../../actions";
import { connect } from 'react-redux';

import './SearchPeople.sass';

import UserBLock from '../../components/search/UserBlock';

class SearchPeople extends Component {
    componentWillMount() {
        console.log(this.props.users);
        if (!this.props.users.length) {
            let token = localStorage.getItem('token');
            this.props.getUsers(token)
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row search-header">
                    <div className="col-6 offset-3">
                        <input className='form-control search-input' type="text" placeholder='Search'/>
                    </div>
                </div>
                {this.props.users.map((el, index) => {
                    return <UserBLock key={index} user={el}/>
                })}

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
        getUsers: token => dispatch(getUsers(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPeople);