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
          render={() => (
            <RootComponent />)} />
        <Route path="/category" exact
          render={() => (
            <CategoryComponent />)} />
        <Route path="/post" exact
          render={() => (
            <PostComponent />)} />
      </div>
    );
  }
}

export default App;
