import React from 'react';
import Navbar from './Navbar';
import HomePage from './HomePage';
import {Route, Switch} from 'wouter';
import ProductsPage from './ProductsPage';
import RegisterPage from './RegisterPage';
function App() {

 
  return (
    <>

    <Navbar/>
    <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/register" component={RegisterPage} />
    </Switch>    

    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; 2023 E-Shop. All rights reserved.</p>
      </div>
    </footer>

    </>
  );
}

export default App;