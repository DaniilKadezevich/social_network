import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

class App extends Component {

    render() {
    return (
      <div className="App">
          <Header/>
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
