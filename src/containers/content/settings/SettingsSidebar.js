import React, {Component} from "react";
import { settingsSidebarMenu } from "./SttingsSidebarElements";
import { Link } from 'react-router-dom';


export default class SettingsSidebar extends Component {
    render() {
        return(
            <div className="col-4 text-center settings-sidebar">
                <ul className="settings-menu">
                    {settingsSidebarMenu.map((title, index) => {
                       return (
                           <Link key={index} to={`/settings/${title.toLowerCase()}`}>
                               <li className="settings-menu-el">
                                   {title}
                               </li>
                           </Link>
                           )
                    })}
                </ul>
            </div>
        )
    }
}