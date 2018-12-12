import React from "react";
import momemt from "moment";
import http from "axios";
import RouteListModal from "./Modal/RouteListModal";

class TrainRoutePage extends React.Component {
  state = {
    journeyDate: "",
    stationFormId: "",
    stationToId: "",
    classId: "",
    stationsFromList: [],
    stationsToList: [],
    classList: [],
    listofTrainsInfo: [],
    showRouteModal: false,
    routes: []
  };

  baseUrl = "http://localhost:5000/api";

  async componentDidMount() {
    let response = await http.get(`${this.baseUrl}/stations`);
    const stationsFromList = response.data || [];
    this.setState({ stationsFromList });

    response = await http.get(`${this.baseUrl}/stations/classes`);
    const classList = response.data || [];
    this.setState({ classList });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleChangeStationFrom = async event => {
    const { value } = event.target;
    this.setState({ stationFormId: value });
    if (!value) return;
    const response = await http.get(
      `${this.baseUrl}/stations/stations/${value}`
    );  
    const stationsToList = response.data || [];
    this.setState({ stationsToList });
  };

  handleSearchTrainRoute = async event => {
    event.preventDefault();
    const { journeyDate, stationFormId, stationToId, classId } = this.state;
    const data = {
      journeyDate,
      stationFormId,
      stationToId,
      classId
    };

    const response = await http.post(
      `${this.baseUrl}/stations/search/trains`,
      data
    );
    if (response.status === 200) {
      const listofTrainsInfo = response.data;
      console.log(listofTrainsInfo);
      this.setState({ listofTrainsInfo });
    }
  };

  handleShowHideModal = async (trainId = null) => {
    this.setState((prevState) => ({ 
      showRouteModal: !prevState.showRouteModal
    }));

    // todo api fetch
    if (trainId) {

      const response = await http.get(`${this.baseUrl}/`)
    }

  };

  render() {
    const {
      journeyDate,
      stationFormId,
      stationToId,
      classId,
      stationsFromList,
      stationsToList,
      classList,
      listofTrainsInfo,
      routes,
      showRouteModal
    } = this.state;

    return (
      <div className="card-body border minHeight">
        <div className="offset-2 col-sm-8">
          <form onSubmit={this.handleSearchTrainRoute}>
            <div className="form-group row">
              <label htmlFor="journeyDate" className="col-sm-4 col-form-label">
                Journey Date
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="journeyDate"
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
                htmlFor="stationFormId"
                className="col-sm-4 col-form-label"
              >
                Station From
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name="stationFormId"
                  id="stationForm"
                  value={stationFormId}
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
              <label htmlFor="stationToId" className="col-sm-4 col-form-label">
                Station To
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name="stationToId"
                  id="stationToId"
                  value={stationToId}
                  onChange={this.handleChange}
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
              <label htmlFor="classId" className="col-sm-4 col-form-label">
                Class
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name="classId"
                  id="classId"
                  value={classId}
                  onChange={this.handleChange}
                >
                  <option>select</option>
                  {classList.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4" />
              <div className="col-sm-8">
                <button type="submit" className="btn btn-primary">
                  Search Train Route
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          {listofTrainsInfo.length > 0 && (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Train Code</th>
                  <th>Train Name</th>
                  <th>Departure Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listofTrainsInfo.map((train, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{train.trainNo}</td>
                    <td>{train.trainName}</td>
                    <td>{train.departureTime}</td>
                    <td onClick={() => this.handleShowHideModal(train.id)}>View</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <RouteListModal 
          routes={routes} 
          isOpen={showRouteModal} 
          handleModal={this.handleShowHideModal}
        />
      </div>
    );
  }
}
export default TrainRoutePage;
