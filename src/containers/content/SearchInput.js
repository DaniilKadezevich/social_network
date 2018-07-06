import React, { Component } from 'react';
import { I18n } from "react-redux-i18n";
import { connect } from 'react-redux';
import { ACTION_TYPES } from "../../constants";

class SearchInput extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let regexp;

        try {
            regexp = new RegExp(`^${e.target.value.trim()}`, 'i');
        } catch(e) {
            regexp = new RegExp('.\\*');
        }

        this.props.setRegexp(regexp);
        this.props.removeUsers();
    }

    render() {
        return (
            <input className='form-control search-input' type="text" placeholder={I18n.t('application.search')} onChange={this.handleChange}/>
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
        setRegexp: regexp => dispatch({type: ACTION_TYPES.SET_REGEXP, regexp}),
        removeUsers: () => dispatch({type: ACTION_TYPES.REMOVE_USERS}),
        clearData: () => dispatch({type: ACTION_TYPES.CLEAR_DATA}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)