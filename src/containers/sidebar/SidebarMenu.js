import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { sidebarMenu } from "./sidebarMenuElements";

import { Avatar } from '../../components/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SidebarMenu extends Component {
    render() {
        const sidebarItems =  sidebarMenu.map((el, index) => (
            <Link key={index} to={el.link}>
                <li className='d-flex align-items-center'><FontAwesomeIcon className='mr-1' icon={el.icon}/>{el.text}</li>
            </Link>
        ));
        return(
            <div className="col-2 sidebar">
                <ul className='sidebar-menu'>
                    {sidebarItems}
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default withRouter(connect(mapStateToProps)(SidebarMenu));