import React from 'react';
import Marcadores from './components/pages/marcadores/Marcadores';
import Login from './components/pages/login/Login';
// import SignIn from './components/pages/signin/SignIn';
// import NewMarker from './components/pages/newmarker/NewMarker';
import './app.css';

import {Switch, BrowserRouter as Router} from 'react-router-dom';
import PRoute from './components/utilities/privateroutes';
import NRoute from './components/utilities/normalroutes';

import {setJWT, getLocalStorage, setLocalStorage} from './components/utilities/axios';


export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            user: getLocalStorage('user') || {},
            jwt: getLocalStorage('jwt') || "",
            isLogged: false,
            loadingBackend: false
        }
        if (this.state.jwt !== "") {
            setJWT(this.state.jwt);
            this.state.isLogged = true;
        }
        this.setLogginData = this.setLogginData.bind(this);
        this.setLoggoutData = this.setLoggoutData.bind(this);
    }
    setLogginData(user, jwt) {
        this.setState({
            ...this.state,
            user: user,
            jwt: jwt,
            isLogged: true
        }, () => {
            setLocalStorage('jwt', jwt);
            setLocalStorage('user', user);
            setJWT(jwt);
        });
    }
    setLoggoutData() {
        this.setState({
            ...this.state,
            user: "",
            jwt: ""
        }, () => {
            setJWT('')
        })
    }
    render() {
        const auth = {
            isLogged: this.state.isLogged,
            login: this.setLogginData,
            logout: this.setLoggoutData
        }
        return (<Router>
            <Switch>
                <NRoute path="/"
                    component={Marcadores}
                    exact
                    auth={auth}/>
                <NRoute path="/login"
                    component={Login}
                    exact
                    auth={auth}/> {/* <NRoute path="/signin"
                    component={SignIn}
                    exact
                    auth={auth}/>
                <PRoute path="/marker"
                    component={NewMarker}
                    exact
                    auth={auth}/> */} </Switch>
        </Router>);
    }
}
