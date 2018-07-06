import React, {Component} from "react";
import { TRANSLATIONS_OBJECT, LANGUAGES } from "../../../constants";
import { setLocale } from 'react-redux-i18n';
import { connect } from 'react-redux';
import './Languages.sass';
import {changeLocale} from "../../../actions";

class Language extends Component {
    constructor() {
        super();

        this.setLocale = this.setLocale.bind(this);
    }
    setLocale(key) {
        this.props.setLocale(key);
        localStorage.setItem('locale', key);
        this.props.changeLocale(key);
    }
    render() {
        return(
            <div className='container'>
                <div className="row">
                    <div className="col-8 offset-2 settings-content">
                        <ul className="languages-list">
                            {Object.keys(TRANSLATIONS_OBJECT).map(key => {
                            return <li key={key} className="language-el"
                                       onClick={this.setLocale.bind(this, key)}
                            >{ LANGUAGES[key] } </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        setLocale: locale => dispatch(setLocale(locale)),
        changeLocale: locale => dispatch(changeLocale(locale)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Language)