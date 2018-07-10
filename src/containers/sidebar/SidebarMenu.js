import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { sidebarMenu } from "./sidebarMenuElements";
import { Translate } from 'react-redux-i18n';


class SidebarMenu extends Component {
    render() {
        const sidebarItems =  sidebarMenu.map((el, index) => {
            let Component = el.component;
            let active = this.props.history.location.pathname.includes(el.link) ? 'active' : '';

            return (
                <Link key={index} to={el.link}>
                    <li className={`d-flex align-items-center ${active}`}>
                        <Component {...el.props} src={this.props.user.photo}/>
                        <Translate value={`application.sidebar.${[el.text]}`}/>
                    </li>
                </Link>
            )
        });
        return(
            <div className="col-2 sidebar p-0">
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