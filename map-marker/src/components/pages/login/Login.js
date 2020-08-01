import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import {login} from './axios';
import './login.css';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,Row
  } from 'reactstrap';
export default class extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirectTo: false
        }

        this.onClickButton = this.onClickButton.bind(this);
        this.onTextChange = this.onTextChange.bind(this);

    }

    onTextChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    async onClickButton(e) {
        try {
            let userData = await login(this.state.email, this.state.password);
            const {jwt} = userData;
            delete userData.jwt;
            this.setState({
                "redirectTo": true
            }, () => {
                this.props.auth.login(userData, jwt);
            });
        } catch (e) {
            alert("Incorrect Credentials.");
        }
    }
    render() {
        if (this.state.redirectTo) {
            const tourl = (this.props.location.state) ? this.props.location.state.from.pathname : '/';
            return (<Redirect to={tourl}/>)
        }
        return (<>
        <Container className="App">

        <Row>
          <Col lg="6">
        <Form className="form">
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                onChange={
                    this.onTextChange
                }
                value={
                    this.state.email
                }
                placeholder="myemail@email.com"
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={
                    this.onTextChange
                }
                value={
                    this.state.password
                }
                placeholder="********"
              />
            </FormGroup>

            <small>Don't have an account?
            <NavLink to="/signin"> Sign Up</NavLink>
            </small>
          <br/>
          <Button color="success" onClick={this.onClickButton}>Login</Button>


        </Form>
          </Col>

         
        <Col lg="6">
        

        <Form className="form">
          <Col>
            <FormGroup>
                <h3>Development</h3>
                <p>A modern and clean design system of Map Ilustration</p>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <h3>Features</h3>
                <p>Add Your Own Marker and say Hi to everyone!</p>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <h3>Updates</h3>
                <p>This is Version 1.2</p>
            </FormGroup>
          </Col>
          
        </Form>
        </Col>
        </Row>
      </Container>


        </>);
    }
}
