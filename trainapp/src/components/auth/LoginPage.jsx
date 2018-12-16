import React from "react";
import {NavLink} from 'react-router-dom';

class LoginPage extends React.Component {
  state = {
    userName: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    
    return (
      <div className="card-body border minHeight">
        <div className="card offset-1 col-sm-10">
          <div className="card-header">Bangladesh Railway</div>
          <div className="card-body">
            <div className="offset-1 col-sm-10">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-4 col-form-label">
                  User Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
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
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
