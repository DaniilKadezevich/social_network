import React, { Component } from 'react';
import Greeting from '../dumb/Greeting';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Greeting greeting={'hello world'}/>
      </div>
    );
  }
}

export default App;
