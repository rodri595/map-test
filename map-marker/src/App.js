import React from 'react';
import {Switch, BrowserRouter as Router} from 'react-router-dom';
import PRoute from './components/utilities/privateroutes';
import NRoute from './components/utilities/normalroutes';

import {setJWT, getLocalStorage, setLocalStorage} from './components/utilities/axios';


function App() {
    return (<div>
        hello
    </div>);
}

export default App;
