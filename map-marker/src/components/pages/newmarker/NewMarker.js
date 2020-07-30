import React, { Component } from 'react';
import {marker} from './axios';
import {Redirect} from 'react-router-dom';
export default class extends Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      long: "",
      msg: "",
      redirectTo: false
    }

    this.onClickButton = this.onClickButton.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  onTextChange(e){
    const {name, value} = e.target;
    this.setState({[name]:value});
  }
 async onClickButton(e) {
    try {
        let check =await marker(this.state.lat,this.state.long,this.state.msg);
        if(check){
            this.setState({
                "redirectTo": true
            });
        }
        else{
            alert("Error al crear Marcador.");
        }
       
    } catch (e) {
        alert("Error al crear Marcador.");
    }
  }
  render() {
    if (this.state.redirectTo) {
        return (
            <Redirect to={'/'}/>
        )
    }
    return (<>
    <div className="container">

         <div className="form-control">
            <label>lat</label>
            <input type="number" name="lat" onChange={this.onTextChange}  />
        </div>

        <div className="form-control">
            <label>long</label>
            <input type="number" name="long" onChange={this.onTextChange}  />
        </div>

        <div className="form-control">
            <label>Message</label>
            <input type="text" name="msg" onChange={this.onTextChange} />
        </div>

        <button className="btn" onClick={this.onClickButton}>Add</button> 


        <div className="features">
            <div className="feature">
                <h3>Add</h3>
            </div>
            <div className="feature">
                <h3>New</h3>
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
