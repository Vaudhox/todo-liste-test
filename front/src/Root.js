import * as React from "react";
import { Routes, Route,  } from "react-router-dom";
import { Redirect } from "react-router";
import "./App.css";
import Home from './containers/pages/home'
import Register from './containers/pages/auth/register';
import NoMatch404 from './containers/pages/no-match-404';
import Login from './containers/pages/auth/Login'
import { PrivateRoute } from './utils/privateRoute';
import Logout from './containers/pages/auth/Logout';
import CheckEmail from './containers/pages/auth/CheckEmail'
import List from './containers/pages/Lists';
import ListDetails from "./containers/pages/ListDetails";

function Root() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/checkEmail" element={<CheckEmail/>} />
      <Route path="/logout" element={<Logout/>}/>
      <Route exact path="/lists" element={
        <PrivateRoute>
          <List/>
        </PrivateRoute>
      } />
      <Route exact path="/list/:id" element={
        <PrivateRoute>
          <ListDetails />
        </PrivateRoute>
      } />
      <Route path="*" element={<NoMatch404 />}/>
    </Routes>
  );
}


export default Root;
