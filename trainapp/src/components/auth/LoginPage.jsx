import React from "react";
import { NavLink } from 'react-router-dom';
import http from 'axios';

class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  };
  baseUrl = "http://localhost:5000/api";
  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };
    console.log(data);
    const response = await http.post(`${this.baseUrl}/users/signin`, data);
    console.log(response.status);

    if (response.status === 200) { 
      const token =response.data.token;
      localStorage.setItem("TokenKey",token);
      this.props.history.push('/home');
      return;
    }


  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { email, password } = this.state; 
    return (
      <div className="card-body border minHeight">
        <div className="card offset-1 col-sm-10">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="offset-1 col-sm-10">
                <div className="form-group row">
                  <label htmlFor="email" className="col-sm-4 col-form-label">
                    Email
                </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="password" className="col-sm-4 col-form-label">
                    Password
                </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      onChange={this.handleChange}
                      value={password}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-4"> </div>
                  <div className="col-sm-8 d-flex">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Login
                  </button>
                    <NavLink to="/sign-up" className="btn btn-info btn-sm ml-2">Create New</NavLink>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
