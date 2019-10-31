import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Author from './autor/index';
import Home from  './home';
import Livro from  './livro/index';

export default props => (
    <Switch>
        <Route exact path='/'> 
            <Home />
        </Route>
        <Route exact path='/autor'> 
            <Author />
        </Route>
        <Route exact path='/livro'> 
            <Livro />
        </Route>
    </Switch>
);