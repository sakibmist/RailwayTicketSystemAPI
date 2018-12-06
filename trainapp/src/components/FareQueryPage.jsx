import React from "react";
import momemt from "moment";
import http from "axios";

class FareQueryPage extends React.Component {
  state = {
    journeyDate: "",
    stationFrom: "",
    stationTo: "",
    trainName: "",
    price: 0, 
    stationsFromList: [],
    stationsToList: [],
    trainNameList: [],
    noofTicket: "", 
    classList: [],
    totalPrice:0
  };

  baseUrl = "http://localhost:4446/api";

  async componentDidMount() {
    //auto load nibe when page load nibe.
    const response = await http.get(`${this.baseUrl}/stations`);
    console.log(response);
    const stationsFromList = response.data || [];
    this.setState({ stationsFromList });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleChangeStationFrom = async event => {
    const { value } = event.target;
    this.setState({ stationFrom: value });
    if (!value) return;

    const response = await http.get(
      `${this.baseUrl}/stations/destinations/${value}`
    );
    console.log(response);
    const stationsToList = response.data || [];
    this.setState({ stationsToList });
  };

  handleChangeTo = async event => {
    const { value } = event.target;
    const { journeyDate } = this.state;
    this.setState({ stationTo: value });
    //console.log(journeyDate);
    if (!value || !journeyDate) return;

    const response = await http.get(
      `${this.baseUrl}/stations/trains/${value}/${journeyDate}`
    );
    //console.log(response);
    const trainNameList = response.data || [];
    this.setState({ trainNameList });
  };
  handleChangeTrainName = async event => {
    const { value } = event.target;
    this.setState({ trainName: value });
    if (!value) return;
    const response = await http.get(
      `${this.baseUrl}/stations/train-classes/${value}`
    );
    const classList = response.data || [];
    this.setState({ classList });
  };

  handleSubmit = eventOccur => {
    eventOccur.preventDefault();
    const { noofTicket, price }= this.state; 

    const totalPrice = parseInt(noofTicket) * parseFloat(price);

    this.setState({ totalPrice });
     
  };

  render() {
    const {
      journeyDate,
      stationFrom,
      stationTo,
      trainName,
      price,
      noofTicket,
      stationsFromList,
      stationsToList,
      trainNameList,
      classList,
      totalPrice
    } = this.state;

    return (
      <div className="">
        <div className="offset-1 col-md-10 topheight">
          <div className="col-sm-6 ">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="journeyDate"
                  className="col-sm-2 col-form-label"
                >
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
                        <option
                          key={index}
                          value={momemt(today).format("YYYY-MM-DD")}
                        >
                          {momemt(today).format("DD-MM-YYYY")}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="stationFrom"
                  className="col-sm-2 col-form-label"
                >
                  Station From
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    name="stationFrom"
                    value={stationFrom}
                    onChange={this.handleChangeStationFrom}
                  >
                    <option>select</option>
                    {stationsFromList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
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
                    onChange={this.handleChangeTo}
                  >
                    <option>select</option>
                    {stationsToList.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    ))}
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
                    onChange={this.handleChangeTrainName}
                  >
                    <option>select</option>
                    {trainNameList.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    ))}
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
                    name="price"
                    value={price}
                    onChange={this.handleChange}
                  >
                    <option>select</option>
                    {classList.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="noofAdult" className="col-sm-2 col-form-label">
                  No of Tickets
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="noofTicket"
                    name="noofTicket"
                    value={noofTicket}
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
          <div className="col-sm-6 Floatt">
            <div className="offset-2 col-md-8">
              <h3>Total Fare:</h3>
              <p>{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FareQueryPage;
