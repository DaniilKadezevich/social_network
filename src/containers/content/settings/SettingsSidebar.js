import React, {Component} from "react";
import { settingsSidebarMenu } from "./SttingsSidebarElements";
import { Link } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';


export default class SettingsSidebar extends Component {
    render() {
        return(
            <div className="col-4 text-center settings-sidebar">
                <ul className="settings-menu">
                    {settingsSidebarMenu.map((title, index) => {
                       return (
                           <Link key={index} to={`/settings/${title}`}>
                               <li className="settings-menu-el">
                                   <Translate value={`application.settingsSidebar.${[title]}`}/>
                               </li>
                           </Link>
                           )
                    })}
                </ul>
            </div>
        )
    }
}