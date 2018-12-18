import React from "react";
import http from 'axios';

class SignUpPage extends React.Component {
  state = {
    name: "",
    mobileNo: "",
    email: "",
    password: "",
    passwd: "",
    isPasswordMatch: true
  };

  baseUrl = "http://localhost:5000/api";

  handleSubmit = async event => {
    event.preventDefault();
    const { name, mobileNo, email, password, passwd } = this.state;
    console.log(this.state);
    if (name === '' || email === '' || password === '' || passwd === '') {
      alert('Empty Fields are Required!');
    } else {
      const data = { name, mobileNo, email, password };
      const response = await http.post(`${this.baseUrl}/users/signup`, data);
      if (response.status === 200) {
        console.log(response.data);
        this.props.history.push('/login');
        return;
      }
    }

  };

  handleChange = event => {


    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);

  };

  handleMobileChange = event => {
    const { value } = event.target;
    this.setState({ mobileNo: value, password: '', passwd: '', isPasswordMatch: true });
    console.log(this.state);
  }

  handleMatchPassword = () => {
    let { password, passwd } = this.state;
    this.setState({
      isPasswordMatch: password === passwd
    });
  };

  render() {

    const { name, mobileNo, email, password, passwd, isPasswordMatch } = this.state;

    return (
      <div className="card-body border minHeight">
        <div className="offset-1 col-sm-10">
          <div className="card border">
            <div className="card-header border">User Registration</div>
            <div className="card-body border">
              <form onSubmit={this.handleSubmit}>
                <div className="offset-1 col-sm-10">
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-4 col-form-label">
                      Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="mobileNo"
                      className="col-sm-4 col-form-label"
                    >
                      Mobile No.
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNo"
                        name="mobileNo"
                        value={mobileNo}
                        onChange={this.handleMobileChange}
                      />
                    </div>
                  </div>
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
                    <label
                      htmlFor="password"
                      className="col-sm-4 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="passwd" className="col-sm-4 col-form-label">
                      Re-enter Password
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control"
                        name="passwd"
                        id="passwd"
                        value={passwd}
                        onBlur={this.handleMatchPassword}
                        onChange={this.handleChange}
                      />
                      {!isPasswordMatch && (
                        <span className="text-danger">Password Doesn't Match!</span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-4"> </div>
                    <div className="col-sm-8">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
