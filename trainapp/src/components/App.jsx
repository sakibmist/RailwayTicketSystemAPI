import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
//import logo from './logo.svg';
import "./App.css";
import LoginPage from "./auth/LoginPage";
import SignUpPage from "./auth/SignUpPage";
import DashboardPage from "./DashboardPage";
import FareQueryPage from "./FareQueryPage";
import TrainRoutePage from "./TrainRoutePage";
import AddRouteTrainPage from './auth/AddRouteTrainPage';

class App extends Component {
  render() {
    return (
      <div className="offset-1 col-sm-10">
        <div className="container">
          <div className="card border minHeight">
            <div className="card-header border">
              <h2 style={{ textAlign: "center" }}>Header</h2>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info border-circle">
              <a className="navbar-brand" href="@">
                Navbar
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active navSpace">
                    <NavLink className="nav-link" to="/app">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item navSpace">
                    <NavLink className="nav-link" to="/fare-query">
                      Fare Query
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown navSpace">
                    <a
                      className="nav-link dropdown-toggle"
                      href="sd"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item" href="d">
                        Action
                      </a>
                      <a className="dropdown-item" href="d">
                        Another action
                      </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="sd">
                        Something else here
                      </a>
                    </div>
                  </li>
                  <li className="nav-item navSpace">
                    <NavLink className="nav-link" to="/TrainRoutePage">
                      Train Route
                    </NavLink>
                  </li>
                  <li className="nav-item navSpace">
                    <NavLink className="nav-link" to="/add-route">
                      Add Train Route
                    </NavLink>
                  </li>
                  <li className="nav-item navSpace">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="minHeight">
              <Switch>
                <Route path="/login" component={LoginPage} exact />
                <Route path="/sign-up" component={SignUpPage} exact />
                <Route path="/home" component={DashboardPage} exact />
                <Route path="/fare-query" component={FareQueryPage} exact />
                <Route path="/TrainRoutePage" component={TrainRoutePage} exact />
                <Route path="/add-route" component={AddRouteTrainPage} exact />
              </Switch>
            </div>
            <div className="card-footer border">
              <h6 className="text-center">
                All rights are reserved by the authority.
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
