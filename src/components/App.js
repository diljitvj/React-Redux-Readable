import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import RootComponent from './RootComponent'
import CategoryComponent from './CategoryComponent'
import PostComponent from './PostComponent'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route path="/" exact
          component={RootComponent} />
        <Route path="/category/:id" exact
          component={CategoryComponent} />
        <Route path="/post/:id" exact
          component={PostComponent} />
      </div>
    );
  }
}

export default App;
