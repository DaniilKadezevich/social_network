import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class AccountEditBlock extends Component {
    render() {
        return (
            <div className="edit">
                <Link to='/account/edit'>
                    <button type='button' className='btn btn-light'>
                        <FontAwesomeIcon className='mr-1' icon='cog'/>
                        Edit profile
                    </button>
                </Link>
            </div>
        )
    }
}