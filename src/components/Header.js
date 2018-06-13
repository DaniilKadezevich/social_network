import React, { Component } from 'react';
import './Header.sass'

import { Grid, Row, Col, Button} from 'react-bootstrap';

export default class Header extends Component {

    render() {
        return (
            <header className='header'>
                <Grid>
                    <Row>
                        <Col sm={6} className='d-flex align-items-center header-logo'>Facebook</Col>
                        <Col sm={6} className='d-flex justify-content-end align-items-center'>
                            <Button bsStyle='primary'> Log in </Button>
                        </Col>
                    </Row>
                </Grid>
            </header>
        );
    }
}