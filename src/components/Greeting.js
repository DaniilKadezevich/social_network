import React, { Component } from 'react';

class Greeting extends Component {
    render() {
        return(
            <h1>{this.props.greeting}</h1>
        )
    }
}



export default Greeting;
