import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Helmet from 'react-helmet';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button, FormText, FormFeedback,
} from 'reactstrap';
import FormHeader from "./FormHeader";


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            validate: {
                emailState: '',
            },
        };
        this.handleChange = this.handleChange.bind(this);
    }

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [ name ]: value,
        });
    };

    submitForm(e) {
        e.preventDefault();
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <Helmet
                    title="Login"
                    meta={[
                        {
                            name: 'description',
                            content: 'Necessary Login Page for using the tool',
                        },
                    ]}
                />
                <div className="col-xs-12 col-md-4 col-md-offset-6 col-sm-8 col-sm-offset-2">
                <FormHeader title="Sign in to access the tool" description=""/>
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@maf.ae"
                                value={ email }
                                valid={ this.state.validate.emailState === 'has-success' }
                                invalid={ this.state.validate.emailState === 'has-danger' }
                                onChange={ (e) => {
                                    this.validateEmail(e);
                                    this.handleChange(e);
                                } }
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={ password }
                                onChange={ (e) => this.handleChange(e) }
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                    <Button>Submit</Button>
                    </Col>
                </Form>
                </div>
            </div>
        );
    }
}

export default LoginPage;
