import React, { Component } from 'react';
import {signin} from './axios';
import {Redirect} from 'react-router-dom';
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
    <div className="container">

        <div className="form-control">
            <label>Correo Electrónico</label>
            <input type="email" name="email" onChange={this.onTextChange} value={this.state.email} />
        </div>

        <div className="form-control">
            <label>Nombre Completo</label>
            <input type="text" name="nombreCompleto" onChange={this.onTextChange} value={this.state.nombreCompleto} />
        </div>

        <div className="form-control">
            <label>Password</label>
            <input type="password" name="password" onChange={this.onTextChange} value={this.state.password} />
        </div>]

        <button className="btn" onClick={this.onClickButton}>Sign In</button>


        <div className="features">
            <div className="feature">
                <h3>Development</h3>
                <p>Create Your Account and leave a message on the map</p>
            </div>
            <div className="feature">
                <h3>Features</h3>
                <p>Fully Functional and Responsive Map</p>
            </div>
            <div className="feature">
                <h3>Updates</h3>
                <p>This is Version 1.2</p>
            </div>
        </div>
    </div>
</>
    )
  }
}
