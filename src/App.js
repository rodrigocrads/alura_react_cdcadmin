import React, { Component } from 'react';
import Menu from '../src/components/menu';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';

import Routes from '../src/components/routes';

class App extends Component {
    render() {
        return (
            <div id="layout">
                <Menu />
                <Routes />
            </div>
        );
    }
}

export default App;
