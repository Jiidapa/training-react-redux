import React from 'react';

import { Provider } from 'react-redux';
// import { createStore } from 'redux'
// import rootReducer from './redux/reducers/index'

import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './redux/configureStore'

import Navbar from './components/Navibar';
import PrivateRoute from './guard/auth';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Shop from './pages/Shop';
import Register from './pages/Register'
import Cart from './pages/Cart'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './components/Footer';
// import './App.css';

// const store = createStore(rootReducer)
const { store, persistor } = configureStore()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <PrivateRoute path='/about' component={About} />
            <Route path='/shop/:id' component={Shop} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={Cart} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
