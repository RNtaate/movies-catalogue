import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import MovieDetails from './MovieDetails';

let RouterComp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App}/>
        <Route path="/details" exact component={MovieDetails}/>
      </Switch>
    </BrowserRouter>
  )
}

export default RouterComp;