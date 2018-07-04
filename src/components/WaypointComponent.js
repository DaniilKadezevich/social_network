import React, { Component } from 'react';
import { Translate } from "react-redux-i18n";

import Waypoint from 'react-waypoint';
import DataPreloader from './DataPreloader';

export default class WaypointComponent extends Component {
    render() {
        return (
            <div>
            {!this.props.stopLoad ?
                <div>
                    <Waypoint
                        onEnter={this.props.onEnter}
                    />
                    <div className='p-4'>
                        <DataPreloader/>
                    </div>
                </div>
                :
                !this.props.length &&
                <div className='col d-flex justify-content-center p-3'>
                    <Translate value={this.props.message}/>
                </div>
            }
            </div>
        )
    }
}