import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import firebase from './firebase';

import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import New from './components/New';
import Register from './components/Register';
import './global.css';

class App extends Component {

  state = {
    firebaseInitialized: false
  };

  componentDidMount() {
    firebase.isInitialiazed().then(resultado => {
      // Devolve o usuário
      this.setState({ firebaseInitialized: resultado });
    })
  }

  render() {
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard/new" component={New} />
        </Switch>
      </BrowserRouter>
    ) : (
        <did id="loading">
          <h1>Carregando...</h1>
        </did>
      );
  }
}

export default App;
