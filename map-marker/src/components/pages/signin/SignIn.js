import React, { Component } from 'react';
import {signin} from './axios';
import {Redirect, NavLink} from 'react-router-dom';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,Row
  } from 'reactstrap';
export default class extends Component {
  constructor() {
    super();
    this.state = {
      email:'',
      nombreCompleto:'',
      password:'',
      redirectTo: false
    }

    this.onClickButton = this.onClickButton.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  onTextChange(e){
    const {name, value} = e.target;
    this.setState({[name]:value});
  }
 async  onClickButton(e) {
    try {
        let check =await signin(this.state.email,this.state.nombreCompleto, this.state.password);
        if(check){
            this.setState({
                "redirectTo": true
            });
        }
        else{
            alert("Error al crear cuenta.");
           
        }
       
    } catch (e) {
        alert("Error al crear cuenta.");
    }
  }
  render() {
    if (this.state.redirectTo) {
        return (
            <Redirect to={'/login'}/>
        )
    }
    return (<>
    <Container className="App">
            <Row>
            <Col lg="6">
            <Form className="form">
                <FormGroup>
                <Label>Email</Label>
                <Input
                    type="email" name="email" onChange={this.onTextChange}
                    value={this.state.email}
                    placeholder="myemail@email.com"
                />
                </FormGroup>
                
                <FormGroup>
                <Label>Full Name</Label>
                <Input
                    type="text" name="nombreCompleto" onChange={this.onTextChange}
                    value={this.state.nombreCompleto}
                    placeholder="John Doe"
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
                <small>Do have an account?
                <NavLink to="/login"> Login</NavLink>
                </small>
            <Button color="success" onClick={this.onClickButton}>Create Account</Button>
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
                    <p>Add Your Owen Marker and say Hi to evryone!</p>
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

</>
    )
  }
}
