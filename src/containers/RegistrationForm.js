import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegistrationForm.sass'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Radio, Form, Button } from 'react-bootstrap';


export default class RegistrationForm extends Component {

    render() {
        return (
            <Grid>
                <Row>
                    <Col xsOffset={6} sm={4} >
                        <Form className='regFormContainer'>
                            <Form componentClass={FormGroup} inline>
                                <Col sm={6} className='pl-0'>
                                    <FormControl type='text' className='w-100' placeholder='Name'/>
                                </Col>
                                <Col sm={6} className='pr-0'>
                                    <FormControl type='text' className='w-100' placeholder='Surname'/>
                                </Col>
                            </Form>
                            <FormGroup >
                                <FormControl type='text'  placeholder='Middle Name'/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl type='email' placeholder='Email'/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl type='number' placeholder='Age'/>
                            </FormGroup>
                            <Form componentClass={Col} horizontal>
                                <FormGroup controlId="registrationFormPhoto">
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Photo:
                                    </Col>
                                    <Col sm={9} className='pt-2'>
                                        <FormControl type='file' />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Gender:
                                    </Col>
                                    <Col sm={9}>
                                        <Radio name="gender" inline>
                                            Male
                                        </Radio>
                                        <Radio name="gender" className='ml-5' inline>
                                            Female
                                        </Radio>
                                    </Col>
                                </FormGroup>
                                <FormGroup className='d-flex justify-content-center mt-5'>
                                    <Button bsStyle='success' type='submit'> Sign Up </Button>
                                </FormGroup>
                            </Form>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}