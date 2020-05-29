import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Cart from "./components/Cart"
import Details from "./components/Details"
import Admin from "./components/Admin"
import AdminEdit from "./components/AdminEdit"
import AdminAdd from "./components/AdminAdd"
import AdminList from "./components/AdminList"
import AdminLogin from "./components/AdminLogin"

function App() {

  const AdminContainer = () => (
    <div className="container">
      <Route path="/admin" component={ Admin } />
      <Route path="/admin/login" exact component={ AdminLogin } />
      <Route path="/admin/list" exact component={ AdminList } />
      <Route path="/admin/edit/:id" exact component={ AdminEdit } />
      <Route path="/admin/add" exact component={ AdminAdd } />
    </div>
  )

 const DefaultContainer = () => (
    <div>
      <Navbar />
      <div className="container">
        <Route path="/" exact component={ Home } />
        <Route path="/cart" exact component={ Cart } />
        <Route path="/details/:id" exact component={ Details } />
      </div>
    </div>
 )

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin" component={ AdminContainer } />
          <Route component={ DefaultContainer } />
        </Switch>
      </div>
  </Router>
  ); 
}

export default App;
