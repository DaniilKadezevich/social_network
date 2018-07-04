import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { sidebarMenu } from "./sidebarMenuElements";


class SidebarMenu extends Component {
    render() {
        const sidebarItems =  sidebarMenu.map((el, index) => {
            let Component = el.component;
            return (
                <Link key={index} to={el.link}>
                    <li className='d-flex align-items-center'>
                        <Component {...el.props} src={this.props.user.photo}/>{el.text}
                    </li>
                </Link>
            )
        });
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