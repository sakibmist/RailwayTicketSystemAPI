import React from "react";
import momemt from "moment";

class FareQueryPage extends React.Component {
  state = {
    journeyDate: "",
    stationFrom: "",
    stationTo: "",
    trainName: "",
    classtype: "",
    noofAdult: "",
    noofChild: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = eventOccur => {
    eventOccur.preventDefault();
    console.log(this.state);
  };

  render() {
    const {
      journeyDate,
      stationFrom,
      stationTo,
      trainName,
      classtype,
      noofAdult,
      noofChild
    } = this.state;
    return (
      <div className="">
        <div className="offset-2 col-md-8 topheight">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="journeyDate" className="col-sm-2 col-form-label">
                Journey Date
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="journeyDate"
                  value={journeyDate}
                  onChange={this.handleChange}
                >
                  <option>select</option>
                  {[...Array(10)].map((item, index) => {
                    let today = new Date();
                    const date = today.getDate();
                    today.setDate(date + index);
                    return (
                      <option key={index}>
                        {momemt(today).format("DD-MM-YYYY")}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="stationFrom" className="col-sm-2 col-form-label">
                Station From
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="stationFrom"
                  value={stationFrom}
                  onChange={this.handleChange}
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="stationTo" className="col-sm-2 col-form-label">
                Station To
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="stationTo"
                  value={stationTo}
                  onChange={this.handleChange}
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="trainName" className="col-sm-2 col-form-label">
                Train Name
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="trainName"
                  value={trainName}
                  onChange={this.handleChange}
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="classtype" className="col-sm-2 col-form-label">
                Class
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="classtype"
                  value={classtype}
                  onChange={this.handleChange}
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="noofAdult" className="col-sm-2 col-form-label">
                No of Adult
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="noofAdult"
                  name="noofAdult"
                  value={noofAdult}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="noofChild" className="col-sm-2 col-form-label">
                No of Child
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="noofChild"
                  name="noofChild"
                  value={noofChild}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default FareQueryPage;
