import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Services from './components/pages/Services';
import Cart from './components/pages/Cart';
import InvSection from './components/pages/Inv';
import Ingreso from './components/pages/Input';

import Login from './pages/login';
import Footer from './components/Footer';
import Header from 'components/Header';
import {UserContextProvider} from 'context/UserContext'
import PrivateRoute from 'components/PrivateRoute';
function App() {
  
  return (
    <UserContextProvider>
      <Router>
        <Header/>
          <Switch>
            <Route path='/login' exact component = {Login}/>
            <Route path='/' exact component = {Login}/>
            <PrivateRoute path='/inv'>
              <Route path='/inv' exact component = {InvSection}/>
            </PrivateRoute>

            <PrivateRoute path='/cart'>
              <Route path='/cart' exact component = {Cart}/>
            </PrivateRoute>

            <PrivateRoute path = '/services'>
              <Route path='/services' exact component = {Services}/>
            </PrivateRoute>

            <PrivateRoute path = '/ingreso'>
              <Route path='/ingreso' exact component = {Ingreso}/>
            </PrivateRoute>
            
          </Switch>
        <Footer></Footer>
      
      </Router>
    </UserContextProvider>
  );
}

export default App;
