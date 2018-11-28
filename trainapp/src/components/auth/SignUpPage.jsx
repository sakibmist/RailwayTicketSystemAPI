import React from "react";

class SignUpPage extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    mobileNo: "",
    securCode: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    this.log(this.state);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  log = obj => {
    console.log(obj);
  };

  render() {
    const {
      name,
      email,
      password,
      repassword,
      address,
      mobileNo,
      securCode
    } = this.state;

    return (
      <div className="card ">
        <div className="card-header">Bangladesh Railway</div>
        <form onSubmit={this.handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="offset-md-1 col-md-5">
                <div className="card">
                  <div className="card-header">Personal Information</div>
                  <div className="card-body">
                    <label htmlFor="name">
                      Passenger Name
                      <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      onChange={this.handleChange}
                      value={name}
                    />
                    <label htmlFor="email">
                      Email
                      <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      onChange={this.handleChange}
                      value={email}
                    />
                    <label htmlFor="password">
                      Password
                      <span className="req">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      onChange={this.handleChange}
                      value={password}
                    />
                    <label htmlFor="repaswd">
                      Re-enter Password
                      <span className="req">*</span>
                    </label>
                    <input
                      type="password"
                      id="repaswd"
                      className="form-control"
                      name="repassword"
                      onChange={this.handleChange}
                      value={repassword}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header">Extra Information</div>
                  <div className="card-body">
                    <label htmlFor="address">
                      Address
                      <span className="req">*</span>
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      className="form-control"
                      onChange={this.handleChange}
                      value={address}
                    />
                    <label htmlFor="mobileNo">
                      Mobile No.
                      <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobileNo"
                      name="mobileNo"
                      onChange={this.handleChange}
                      value={mobileNo}
                    />
                    <label htmlFor="securCode">
                      Security Code
                      <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="securCode"
                      id="securCode"
                      onChange={this.handleChange}
                      value={securCode}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div className="card-footer text-muted text-center">
          All rights are reserved by Bangladesh Railway
        </div>
      </div>
    );
  }
}

export default SignUpPage;