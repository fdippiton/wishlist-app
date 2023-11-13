import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import './custom.css';
import { BrowserRouter } from 'react-router-dom/dist';
import { CrearListaRegalos } from './components/CrearListaRegalos';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Layout />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/crearListaRegalos"
            element={<CrearListaRegalos />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
