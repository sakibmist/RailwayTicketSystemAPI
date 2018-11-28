import React from "react";

class DashboardPage extends React.Component {
  render() {
    return (
      <div className=""> 
        <div className="offset-2 col-md-8 topheight">
          <form>
            <div className="form-group row">
              <label for="inputEmail3" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="inputPassword3" className="col-sm-2 col-form-label">
                Password
              </label>
              <div class="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default DashboardPage;
