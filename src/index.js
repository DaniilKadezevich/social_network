import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './store';
import App from './containers/App';

import 'bootstrap/dist/css/bootstrap.css';
import './index.sass';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {URLS} from "./constants";

library.add(fab, fas);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path={URLS.HOME} component={App}/>
        </BrowserRouter>
    </Provider>

    , document.getElementById('root')
);

