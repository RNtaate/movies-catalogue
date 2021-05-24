import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import MovieDetails from '../../components/pages/MovieDetails';

const RouterComp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/movie" component={MovieDetails} />
    </Switch>
  </BrowserRouter>
);

export default RouterComp;
