import React, { Component } from 'react';

// import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle';

import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Notification from '../components/Notification';


export default class App extends Component {

    render() {
    return (
      <div className="App">
          <Notification/>
          <Header/>
          <Main/>
          <Footer/>
      </div>
    );
    }
}

