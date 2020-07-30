import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {login} from './axios';
import './login.css';

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
            alert("Error al iniciar sesión.");
        }
    }
    render() {
        if (this.state.redirectTo) {
            const tourl = (this.props.location.state) ? this.props.location.state.from.pathname : '/';
            return (<Redirect to={tourl}/>)
        }
        return (<>
            <div className="container">
                    <div className="form-control">
                        <label>Correo Electrónico</label>
                        <input type="email" name="email"
                            onChange={
                                this.onTextChange
                            }
                            value={
                                this.state.email
                            }/>
                    </div>
                    <div className="form-control">
                        <label>Password</label>
                        <input type="password" name="password"
                            onChange={
                                this.onTextChange
                            }
                            value={
                                this.state.password
                            }/>
                    </div>
                    <button className="btn"
                        onClick={
                            this.onClickButton
                    }>Iniciar Sesión</button>
                    <small>Don't have an account?
                        <a href="/signin">Sign up</a>
                    </small>

               

                <div className="features">
                    <div className="feature">
                        <h3>Development</h3>
                        <p>A modern and clean design system of Map Ilustration</p>
                    </div>
                    <div className="feature">
                        <h3>Features</h3>
                        <p>Add Your Owen Marker and say Hi to evryone!</p>
                    </div>
                    <div className="feature">
                        <h3>Updates</h3>
                        <p>This is Version 1.2</p>
                    </div>
                </div>
            </div>

        </>);
    }
}
