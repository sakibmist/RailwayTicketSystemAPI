import React, { Component } from "react";
import { Route } from "react-router-dom";
//import logo from './logo.svg';
import "./App.css";
import LoginPage from "./auth/LoginPage";
import SignUpPage from "./auth/SignUpPage";
import DashboardPage from "./DashboardPage";
import FareQueryPage from "./FareQueryPage";

class App extends Component {
  render() {
    return (
      <div className="container">
      <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active navSpace">
                <a className="nav-link" href="s">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item navSpace">
                <a className="nav-link" href="s">
                  Link
                </a>
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
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
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
                <a className="nav-link disabled" href="df">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/home" component={DashboardPage} />
        <Route path="/fare-query" component={FareQueryPage}/>
        <footer className="footer footerText">
          <div className="container">
            <span className="text-muted">
              Place sticky footer content here.
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
