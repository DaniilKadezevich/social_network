import React, { Component } from 'react';
import { connect } from 'react-redux';
import Greeting from '../components/Greeting';

class App extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch({type: 'CHANGE_GREETING', payload: 'HELLO WORLD!'})
        }, 3000)
    }
    render() {
    return (
      <div className="App">
        <Greeting greeting={this.props.greeting}/>
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
