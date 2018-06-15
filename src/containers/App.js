import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle';

import Main from '../components/Main';
import Footer from '../components/Footer';
import Notification from '../components/Notification';


class App extends Component {
    constructor() {
        super();
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
    render() {
    return (
      <div className="App">
          <Notification />
          <Main/>
          <Footer/>
      </div>
    );
    }
}

function mapStateToProps(state) {
    return {
        greeting: state.greeting,
    }
}

export default connect(mapStateToProps)(App);
