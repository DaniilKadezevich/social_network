import React, { Component } from 'react';

import 'bootstrap/dist/js/bootstrap.bundle';

import { Header, Main, Footer, Notification} from '../components/index'


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

