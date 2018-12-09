import React from "react";

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
    const { userName, password } = this.state;
    return (
      <div className="card">
        <div className="card-header">Bangladesh Railway</div>
        <div className="card-body">
          <div className="row">
            <div className="offset2 col-md-8">
              <div className="card">
                <div className="card-header text-center">Login</div>
                <div className="card-body">
                  <div className="offset-1 col-sm-10">
                    <form onSubmit={this.handleSubmit}>

                      <label htmlFor="userName" className="form-label">
                        User Name
                      <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        id="userName"
                        className="form-control"
                        name="userName"
                        onChange={this.handleChange}
                        value={userName}
                      />
                      <label htmlFor="password" className="form-label">
                        password
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
                      <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                    </form>

                  </div>
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
