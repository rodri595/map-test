import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {login} from './actions';

export default class extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            pswd: '',
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
            let userData = await login(this.state.email, this.state.pswd);
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
            <h2>Iniciar Sesión</h2>
            <fieldset>
                <label>Correo Electrónico</label>
                <input type="email" name="email"
                    onChange={
                        this.onTextChange
                    }
                    value={
                        this.state.email
                    }/>
            </fieldset>
            <fieldset>
                <label>pswd</label>
                <input type="pswd" name="pswd"
                    onChange={
                        this.onTextChange
                    }
                    value={
                        this.state.pswd
                    }/>
            </fieldset>
            <button onClick={
                this.onClickButton
            }>Iniciar Sesión</button>
        </>)
    }
}
